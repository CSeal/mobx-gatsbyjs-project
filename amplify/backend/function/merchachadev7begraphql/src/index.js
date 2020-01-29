/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authMerchachadev7authUserPoolId = process.env.AUTH_MERCHACHADEV7AUTH_USERPOOLID
var apiMerchachadev7apiGraphQLAPIIdOutput = process.env.API_MERCHACHADEV7API_GRAPHQLAPIIDOUTPUT
var apiMerchachadev7apiGraphQLAPIEndpointOutput = process.env.API_MERCHACHADEV7API_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const https = require('https');
const urlParse = require("url").URL;
const queries = require('./query.js');

const region = process.env.REGION;
const authUserPoolId = process.env.AUTH_MERCHACHADEV7AUTH_USERPOOLID;
const appsyncUrl = process.env.API_MERCHACHADEV7API_GRAPHQLAPIENDPOINTOUTPUT;
const endpoint = new urlParse(appsyncUrl).hostname.toString();

const getUserAttributes = async (event) => {
  //console.info("Cognito user lookup");
  const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
  
  const params = {
    UserPoolId: authUserPoolId,
    Username: event.identity.username
  };
  
  return new Promise(function(resolve, reject) {
    cognito.adminGetUser(params, function(err, data) {
      if (err) {
        console.info(JSON.stringify(err, null, 2));
        reject (Error(err));
      } else {
        if (!data.UserAttributes) {
          console.info(JSON.stringify(data, null, 2));
          reject (Error('User pool query did not return user details'));
        }
        const attrs = Object.assign({}, ...data.UserAttributes.map(item => ({ [item.Name]: item.Value })));
        if (!attrs.sub || !attrs.email || attrs.email == '') {
          console.info(JSON.stringify(attrs, null, 2));
          reject (Error('User pool query did not return sub or email'));
        }
        if (attrs.sub != event.identity.sub) {
          console.info(JSON.stringify(attrs, null, 2));
          reject (Error('User sub does not match the calling user'));
        }
        resolve(attrs);
      }
    });
  });
};

const queryGraphQL = async (appSyncQuery) => {
  //console.info("AppSync query");

  // https://aws-amplify.github.io/docs/cli-toolchain/quickstart#graphql-from-lambda
  const req = new AWS.HttpRequest(appsyncUrl, region);

  req.method = "POST";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  // https://graphql.org/learn/serving-over-http/
  req.body = JSON.stringify(appSyncQuery);

  const signer = new AWS.Signers.V4(req, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  return new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      result.on('data', (data) => {
        resolve(JSON.parse(data.toString()));
      });
      result.on('error', (err) => {
        console.info(JSON.stringify(err, null, 2));
        reject (Error(err));
      });
    });
    httpRequest.write(req.body);
    httpRequest.end();
  });
};

const resolvers = {
  Query: {
    getdeckanyauthenticated: async (event) => {
      if (!event.arguments.id || event.arguments.id == '') {
        console.info('No deck Id provided');
        console.log("Received event:", JSON.stringify(event, null, 2));
        return;
      }

      const deckQuery = {
        query: queries.getQuoteBoardWithAllItems,
        variables: { id: event.arguments.id }
      };
      const deckResp = await queryGraphQL(deckQuery);
      //console.info(JSON.stringify(deckResp, null, 2));
      if (!deckResp.data || !deckResp.data.getQuoteBoard || !deckResp.data.getQuoteBoard.id || deckResp.data.getQuoteBoard.id != event.arguments.id) {
        console.info('Deck query failed:');
        console.info(JSON.stringify(deckResp, null, 2));
        return false;
      }

      // CAUTION: deckResp contains qitems here, but when returned
      //  via GrapgQL lambda-resolver those elements disappear;
      //  no longer using this lambda-based get deck.
      return deckResp.data.getQuoteBoard;
    },
    
    inviteacceptdeck: async (event) => {
      if (!event.arguments.deckid || event.arguments.deckid == '') {
        console.info('No deck Id provided');
        return false;
      }

      // query deck info to see current invites
      const deckQuery = {
        query: queries.getQuoteBoardUsers,
        variables: { id: event.arguments.deckid }
      };
      const qBoard = await queryGraphQL(deckQuery).then(resp => resp.data);
      if (!qBoard || !qBoard.getQuoteBoard || !qBoard.getQuoteBoard.members || !qBoard.getQuoteBoard.invites) {
        console.info('QuoteBoard query did not return expected info:');
        console.info(JSON.stringify(qBoard, null, 2));
        return false;
      }
      if (qBoard.getQuoteBoard.owner == event.identity.username) {
        console.info(`User ${event.identity.username} is the owner of this deck:`);
        console.info(JSON.stringify(qBoard, null, 2));
        return true;
      }
      if (qBoard.getQuoteBoard.members.includes(event.identity.username)) {
        console.info(`User ${event.identity.username} is already a member:`);
        console.info(JSON.stringify(qBoard, null, 2));
        return true;
      }

      // verify email of the authenticated user
      const userAttrs = await getUserAttributes(event);
      if (!qBoard.getQuoteBoard.invites.includes(userAttrs.email)) {
        console.info(`User ${event.identity.username} email ${userAttrs.email} not among deck invites:`);
        console.info(JSON.stringify(qBoard, null, 2));
        console.info(JSON.stringify(userAttrs, null, 2));
        return false;
      }

      // update deck members and invites
      const invitesUpd = qBoard.getQuoteBoard.invites;
      const removalIndex = invitesUpd.indexOf(userAttrs.email);
      invitesUpd.splice(removalIndex, 1);
      const deckUpdate = {
        query: queries.updateQuoteBoardUsers,
        variables: {
          input: {
            id: event.arguments.deckid,
            members: [...qBoard.getQuoteBoard.members, event.identity.username],
            invites: invitesUpd,
          }
        }
      };
      const qBoardUpd = await queryGraphQL(deckUpdate).then(resp => resp.data);
      if (!qBoardUpd.updateQuoteBoard || !qBoardUpd.updateQuoteBoard.id || qBoardUpd.updateQuoteBoard.id != event.arguments.deckid) {
        console.info('Deck update failed:');
        console.info(JSON.stringify(qBoardUpd, null, 2));
        return false;
      }

      return true;
    },

    deletedeckuserjoins: async (event) => {
      if (!event.arguments.deckid || event.arguments.deckid == '') {
        console.info('No deck Id provided');
        return false;
      }
      if (!event.arguments.usernames || event.arguments.usernames.length == 0) {
        console.info('No usernames provided');
        return false;
      }

      // query deck info to see members: verify the calling user can edit it
      const deckQuery = {
        query: queries.getQuoteBoardUsers,
        variables: { id: event.arguments.deckid }
      };
      const qBoard = await queryGraphQL(deckQuery).then(resp => resp.data);
      if (!qBoard || !qBoard.getQuoteBoard || !qBoard.getQuoteBoard.owner || !qBoard.getQuoteBoard.members) {
        console.info('QuoteBoard query did not return expected info:');
        console.info(JSON.stringify(qBoard, null, 2));
        return false;
      }
      const isDeckEditor = (event.identity.username == qBoard.getQuoteBoard.owner) || qBoard.getQuoteBoard.members.includes(event.identity.username);
      // site admin is always permitted to modify
      const isAdmin = event.identity.groups && event.identity.groups.includes('admin');
      if (!isDeckEditor && !isAdmin) {
        console.info(`User ${event.identity.username} is not an editor of this deck:`);
        console.info(JSON.stringify(qBoard, null, 2));
        return false;
      }

      const deckEditorDelete = {
        query: queries.deleteQuoteBoardEditor,
        variables: { input: { id: null } }
      };
      await Promise.all(event.arguments.usernames.map(async memberUsername => {
        try {
          deckEditorDelete.variables.input.id = event.arguments.deckid + '_' + memberUsername;
          await queryGraphQL(deckEditorDelete);
        } catch (err) {
          console.info(err);
        }
      }));

      return true;
    },

    createquoteitem: async (event) => {
      if (!event.arguments.deckid || event.arguments.deckid == '') {
        console.info('No deck Id provided');
        return false;
      }
      if (!event.arguments.productId || event.arguments.productId == '') {
        console.info('No product Id provided');
        return false;
      }

      // query deck info to see members: verify the calling user can edit it
      const deckQuery = {
        query: queries.getQuoteBoardUsers,
        variables: { id: event.arguments.deckid }
      };
      const qBoard = await queryGraphQL(deckQuery).then(resp => resp.data);
      if (!qBoard || !qBoard.getQuoteBoard || !qBoard.getQuoteBoard.owner || !qBoard.getQuoteBoard.members) {
        console.info('QuoteBoard query did not return expected info:');
        console.info(JSON.stringify(qBoard, null, 2));
        return false;
      }
      const isDeckEditor = (event.identity.username == qBoard.getQuoteBoard.owner) || qBoard.getQuoteBoard.members.includes(event.identity.username);
      if (!isDeckEditor) {
        console.info(`User ${event.identity.username} is not an editor of this deck:`);
        console.info(JSON.stringify(qBoard, null, 2));
        return false;
      }

      // create pending quote item
      const qitemCreate = {
        query: queries.createQuoteItemPending,
        variables: {
          input: {
            productId: event.arguments.productId,
            productName: event.arguments.productName,
            productDescription: event.arguments.productDescription,
            productImage: event.arguments.productImage,
            productImagesMore: [],
            productCategory: event.arguments.productCategory,
            quantity: event.arguments.quantity,
            pricecents: 0,
            usernotes: event.arguments.usernotes,
            // board connection
            quoteItemBoardId: event.arguments.deckid,
          }
        }
      };
      const qitemResp = await queryGraphQL(qitemCreate);
      if (!qitemResp.data || !qitemResp.data.createQuoteItem) {
        console.info('Quote item create failed:');
        console.info(JSON.stringify(qitemResp, null, 2));
        return false;
      }

      // update deck status to pending quotes (regardless of prev. state)
      const deckUpdate = {
        query: queries.updateQuoteBoardStatus,
        variables: {
          input: {
            id: event.arguments.deckid,
            pendingquotes: true,
          }
        }
      };
      const qBoardUpd = await queryGraphQL(deckUpdate).then(resp => resp.data);
      if (!qBoardUpd.updateQuoteBoard || !qBoardUpd.updateQuoteBoard.id || qBoardUpd.updateQuoteBoard.id != event.arguments.deckid) {
        console.info('Deck update failed:');
        console.info(JSON.stringify(qBoardUpd, null, 2));
        return false;
      }

      return true;
    },

    updatequoteitemsdeck: async (event) => {
      if (!event.arguments.qitemid || event.arguments.qitemid == '') {
        console.info('No item Id provided');
        return false;
      }
      const qitemId = event.arguments.qitemid;

      // newdeckid can be '' indicating item is being removed from its current deck
      const newdeckId = (!event.arguments.newdeckid || event.arguments.newdeckid == '') ? null : event.arguments.newdeckid;

      // admin is permitted to modify any quote item
      const isAdmin = event.identity.groups && event.identity.groups.includes('admin');
      if (!isAdmin) {
        // not admin: need to check permissions;
        // query QuoteItem's current deck: verify the calling user can edit it
        const itemQuery = {
          query: queries.getQuoteItemsBoardUsers,
          variables: { id: qitemId }
        };
        const qItem = await queryGraphQL(itemQuery);
        if (!qItem.data || !qItem.data.getQuoteItem || !qItem.data.getQuoteItem.board) {
          // not a normal case for non-admin user: should not happen
          console.info('QuoteItem is not linked to any board:');
          console.info(JSON.stringify(qItem, null, 2));
          return false;
        }
        const qBoard = qItem.data.getQuoteItem.board;
        if (!qBoard.owner || !qBoard.members) {
          console.info('QuoteBoard query did not return expected info:');
          console.info(JSON.stringify(qBoard, null, 2));
          console.info(JSON.stringify(qItem, null, 2));
          return false;
        }
        const isDeckEditor = (event.identity.username == qBoard.owner) || qBoard.members.includes(event.identity.username);
        if (!isDeckEditor) {
          console.info(`User ${event.identity.username} is not an editor of this deck:`);
          console.info(JSON.stringify(qBoard, null, 2));
          console.info(JSON.stringify(qItem, null, 2));
          return false;
        }
      }

      // update item's deck
      const qitemUpdate = {
        query: queries.updateQuoteItemsDeck,
        variables: {
          input: {
            id: qitemId,
            quoteItemBoardId: newdeckId,
          }
        }
      };
      const qitemResp = await queryGraphQL(qitemUpdate);
      if (!qitemResp.data || !qitemResp.data.updateQuoteItem || !qitemResp.data.updateQuoteItem.id) {
        console.info('Quote item update failed:');
        console.info(JSON.stringify(qitemResp, null, 2));
        return false;
      }

      return true;
    },

    checkshopslugavail: async (event) => {
      if (!event.arguments.slug || event.arguments.slug == '') {
        console.info('No shop slug provided');
        console.log("Received event:", JSON.stringify(event, null, 2));
        return;
      }
      const shopQuery = {
        query: queries.shopBySlug,
        variables: { slug: event.arguments.slug }
      };
      const resp = await queryGraphQL(shopQuery);
      if (resp.data && resp.data.shopBySlug && resp.data.shopBySlug.items && resp.data.shopBySlug.items.length === 0) {
        // slug available when no items found
        return true;
      }
      return false;
    },

    inviteaddtoshop: async (event) => {
      if (!event.arguments.shopid || event.arguments.shopid == '') {
        console.info('No shop Id provided');
        return false;
      }
      if (!event.arguments.inviteemail || event.arguments.inviteemail == '') {
        console.info('No invite email provided');
        return false;
      }

      // query shop info: verify the calling user can invite users
      const shopQuery = {
        query: queries.getShopUsers,
        variables: { id: event.arguments.shopid }
      };
      const shopInfo = await queryGraphQL(shopQuery).then(resp => resp.data);
      if (!shopInfo || !shopInfo.getShop || !shopInfo.getShop.owner || !shopInfo.getShop.shopadmins || !shopInfo.getShop.members) {
        console.info('Shop query did not return expected info:');
        console.info(JSON.stringify(shopInfo, null, 2));
        return false;
      }
      const isShopAdmin = (event.identity.username == shopInfo.getShop.owner) || shopInfo.getShop.shopadmins.includes(event.identity.username);
      const isShopMember = shopInfo.getShop.members.includes(event.identity.username);
      const isAdmin = event.identity.groups && event.identity.groups.includes('admin');
      if (!isShopAdmin && !isShopMember && !isAdmin) {
        console.info(`User ${event.identity.username} is not an editor of this shop:`);
        console.info(JSON.stringify(shopInfo, null, 2));
        return false;
      }

      // update shop invites
      const shopUpdate = {
        query: queries.updateShopUsers,
        variables: {
          input: {
            id: event.arguments.shopid,
            invites: [...shopInfo.getShop.invites, event.arguments.inviteemail],
          }
        }
      };
      const shopUpd = await queryGraphQL(shopUpdate).then(resp => resp.data);
      if (!shopUpd.updateShop || !shopUpd.updateShop.id || shopUpd.updateShop.id != event.arguments.shopid) {
        console.info('Shop update failed:');
        console.info(JSON.stringify(shopUpd, null, 2));
        return false;
      }

      return true;
    },

    inviteacceptshop: async (event) => {
      if (!event.arguments.shopid || event.arguments.shopid == '') {
        console.info('No shop Id provided');
        return false;
      }

      // query shop info to see current invites
      const shopQuery = {
        query: queries.getShopUsers,
        variables: { id: event.arguments.shopid }
      };
      const shopInfo = await queryGraphQL(shopQuery).then(resp => resp.data);
      if (!shopInfo || !shopInfo.getShop || !shopInfo.getShop.owner || !shopInfo.getShop.invites) {
        console.info('Shop query did not return expected info:');
        console.info(JSON.stringify(shopInfo, null, 2));
        return false;
      }
      if (shopInfo.getShop.owner == event.identity.username) {
        console.info(`User ${event.identity.username} is the owner of this shop:`);
        console.info(JSON.stringify(shopInfo, null, 2));
        return true;
      }
      if (shopInfo.getShop.members && shopInfo.getShop.members.includes(event.identity.username)) {
        console.info(`User ${event.identity.username} is already a member:`);
        console.info(JSON.stringify(shopInfo, null, 2));
        return true;
      }
      if (shopInfo.getShop.shopadmins && shopInfo.getShop.shopadmins.includes(event.identity.username)) {
        console.info(`User ${event.identity.username} is already an admin:`);
        console.info(JSON.stringify(shopInfo, null, 2));
        return true;
      }

      // verify email of the authenticated user
      const userAttrs = await getUserAttributes(event);
      if (!shopInfo.getShop.invites.includes(userAttrs.email)) {
        console.info(`User ${event.identity.username} email ${userAttrs.email} not among shop invites:`);
        console.info(JSON.stringify(shopInfo, null, 2));
        console.info(JSON.stringify(userAttrs, null, 2));
        return false;
      }

      // update shop members and invites: accepting an invite makes user a member;
      // elevation to admin status (if needed) would be a separate step
      const invitesUpd = shopInfo.getShop.invites;
      const removalIndex = invitesUpd.indexOf(userAttrs.email);
      invitesUpd.splice(removalIndex, 1);
      const shopUpdate = {
        query: queries.updateShopUsers,
        variables: {
          input: {
            id: event.arguments.shopid,
            members: shopInfo.getShop.members ? [...shopInfo.getShop.members, event.identity.username] : [event.identity.username],
            invites: invitesUpd,
          }
        }
      };
      const shopUpd = await queryGraphQL(shopUpdate).then(resp => resp.data);
      if (!shopUpd.updateShop || !shopUpd.updateShop.id || shopUpd.updateShop.id != event.arguments.shopid) {
        console.info('Shop update failed:');
        console.info(JSON.stringify(shopUpd, null, 2));
        return false;
      }

      return true;
    },

    deleteshopuserjoins: async (event) => {
      if (!event.arguments.shopid || event.arguments.shopid == '') {
        console.info('No shop Id provided');
        return false;
      }
      if (!event.arguments.usernames || event.arguments.usernames.length == 0) {
        console.info('No usernames provided');
        return false;
      }

      // query shop info: verify the calling user is owner or among shopadmins
      const shopQuery = {
        query: queries.getShopUsers,
        variables: { id: event.arguments.shopid }
      };
      const shopInfo = await queryGraphQL(shopQuery).then(resp => resp.data);
      if (!shopInfo || !shopInfo.getShop || !shopInfo.getShop.owner || !shopInfo.getShop.shopadmins) {
        console.info('Shop query did not return expected info:');
        console.info(JSON.stringify(shopInfo, null, 2));
        return false;
      }
      const isShopAdmin = (event.identity.username == shopInfo.getShop.owner) || shopInfo.getShop.shopadmins.includes(event.identity.username);
      // site admin is always permitted to modify
      const isAdmin = event.identity.groups && event.identity.groups.includes('admin');
      if (!isShopAdmin && !isAdmin) {
        console.info(`User ${event.identity.username} is not an admin of this shop:`);
        console.info(JSON.stringify(shopInfo, null, 2));
        return false;
      }

      const shopEditorDelete = {
        query: queries.deleteShopEditor,
        variables: { input: { id: null } }
      };
      await Promise.all(event.arguments.usernames.map(async memberUsername => {
        try {
          shopEditorDelete.variables.input.id = event.arguments.shopid + '_' + memberUsername;
          await queryGraphQL(shopEditorDelete);
        } catch (err) {
          console.info(err);
        }
      }));

      return true;
    },

    createshopitem: async (event) => {
      if (!event.arguments.shopid || event.arguments.shopid == '') {
        console.info('No shop Id provided');
        return false;
      }
      if (!event.arguments.access || event.arguments.access == '') {
        console.info('No access setting provided');
        return false;
      }
      if (!event.arguments.productId || event.arguments.productId == '') {
        console.info('No product Id provided');
        return false;
      }
      if (!event.arguments.productName || event.arguments.productName == '') {
        console.info('No product name provided');
        return false;
      }
      if (!event.arguments.productDescription || event.arguments.productDescription == '') {
        console.info('No product description provided');
        return false;
      }
      if (!event.arguments.productImage || event.arguments.productImage == '') {
        console.info('No product image provided');
        return false;
      }

      // query shop info: verify the calling user is among collaborators
      const shopQuery = {
        query: queries.getShopUsers,
        variables: { id: event.arguments.shopid }
      };
      const shopInfo = await queryGraphQL(shopQuery).then(resp => resp.data);
      if (!shopInfo || !shopInfo.getShop || !shopInfo.getShop.owner || !shopInfo.getShop.shopadmins || !shopInfo.getShop.members) {
        console.info('Shop query did not return expected info:');
        console.info(JSON.stringify(shopInfo, null, 2));
        return false;
      }
      const isShopAdmin = (event.identity.username == shopInfo.getShop.owner) || shopInfo.getShop.shopadmins.includes(event.identity.username);
      const isShopMember = shopInfo.getShop.members.includes(event.identity.username);
      const isAdmin = event.identity.groups && event.identity.groups.includes('admin');
      if (!isShopAdmin && !isShopMember && !isAdmin) {
        console.info(`User ${event.identity.username} is not an editor of this shop:`);
        console.info(JSON.stringify(shopInfo, null, 2));
        return false;
      }

      // create shop item
      const sitemCreate = {
        query: queries.createShopItem,
        variables: {
          input: {
            access: event.arguments.access,
            productId: event.arguments.productId,
            productName: event.arguments.productName,
            productDescription: event.arguments.productDescription,
            productImage: event.arguments.productImage,
            productImagesMore: event.arguments.productImagesMore,
            productCategory: event.arguments.productCategory,
            quantity: event.arguments.quantity,
            pricecents: event.arguments.pricecents,
            usernotes: event.arguments.usernotes,
            psize: event.arguments.psize,
            pcolor: event.arguments.pcolor,
            pmaterial: event.arguments.pmaterial,
            pshape: event.arguments.pshape,
            pimprint: event.arguments.pimprint,
            // shop connection
            shopItemShopId: event.arguments.shopid,
          }
        }
      };
      const sitemResp = await queryGraphQL(sitemCreate);
      if (!sitemResp.data || !sitemResp.data.createShopItem) {
        console.info('Shop item create failed:');
        console.info(JSON.stringify(sitemResp, null, 2));
        return false;
      }

      return true;
    },

    getshopitemforeditor: async (event) => {
      if (!event.arguments.sitemid || event.arguments.sitemid == '') {
        console.info('No item Id provided');
        return false;
      }
      const sitemId = event.arguments.sitemid;

      const itemQuery = {
        query: queries.getShopItemsShopUsers,
        variables: { id: sitemId }
      };
      const sItem = await queryGraphQL(itemQuery);
      if (!sItem.data || !sItem.data.getShopItem || !sItem.data.getShopItem.shop) {
        // not a normal case for non-admin user: should not happen
        console.info('ShopItem is not linked to any shop:');
        console.info(JSON.stringify(sItem, null, 2));
        return false;
      }
      const sShop = sItem.data.getShopItem.shop;

      // admin is permitted to read any quote item
      const isAdmin = event.identity.groups && event.identity.groups.includes('admin');
      if (!isAdmin) {
        // not admin: need to check access permissions
        if (!sShop.owner || !sShop.shopadmins || !sShop.members) {
          console.info('Shop query did not return expected info:');
          console.info(JSON.stringify(sShop, null, 2));
          console.info(JSON.stringify(sItem, null, 2));
          return false;
        }
        const isShopAdmin = (event.identity.username == sShop.owner) || sShop.shopadmins.includes(event.identity.username);
        const isShopMember = sShop.members.includes(event.identity.username);
        if (!isShopAdmin && !isShopMember) {
          console.info(`User ${event.identity.username} is not an editor of this shop:`);
          console.info(JSON.stringify(sShop, null, 2));
          console.info(JSON.stringify(sItem, null, 2));
          return false;
        }
      }

      return sItem.data.getShopItem;
    },

    updateshopitemsshop: async (event) => {
      if (!event.arguments.sitemid || event.arguments.sitemid == '') {
        console.info('No item Id provided');
        return false;
      }
      const sitemId = event.arguments.sitemid;

      // newshopid can be '' indicating item is being removed from its current shop
      const newshopId = (!event.arguments.newshopid || event.arguments.newshopid == '') ? null : event.arguments.newshopid;

      // admin is permitted to modify any quote item
      const isAdmin = event.identity.groups && event.identity.groups.includes('admin');
      if (!isAdmin) {
        // not admin: need to check permissions;
        // query ShopItem's current shop: verify the calling user can edit it
        const itemQuery = {
          query: queries.getShopItemsShopUsers,
          variables: { id: sitemId }
        };
        const sItem = await queryGraphQL(itemQuery);
        if (!sItem.data || !sItem.data.getShopItem || !sItem.data.getShopItem.shop) {
          // not a normal case for non-admin user: should not happen
          console.info('ShopItem is not linked to any shop:');
          console.info(JSON.stringify(sItem, null, 2));
          return false;
        }
        const sShop = sItem.data.getShopItem.shop;
        if (!sShop.owner || !sShop.shopadmins || !sShop.members) {
          console.info('Shop query did not return expected info:');
          console.info(JSON.stringify(sShop, null, 2));
          console.info(JSON.stringify(sItem, null, 2));
          return false;
        }
        const isShopAdmin = (event.identity.username == sShop.owner) || sShop.shopadmins.includes(event.identity.username);
        const isShopMember = sShop.members.includes(event.identity.username);
        if (!isShopAdmin && !isShopMember) {
          console.info(`User ${event.identity.username} is not an editor of this shop:`);
          console.info(JSON.stringify(sShop, null, 2));
          console.info(JSON.stringify(sItem, null, 2));
          return false;
        }
      }

      // update item's shop
      const sitemUpdate = {
        query: queries.updateShopItemsShop,
        variables: {
          input: {
            id: sitemId,
            shopItemShopId: newshopId,
          }
        }
      };
      const sitemResp = await queryGraphQL(sitemUpdate);
      if (!sitemResp.data || !sitemResp.data.updateShopItem || !sitemResp.data.updateShopItem.id) {
        console.info('Shop item update failed:');
        console.info(JSON.stringify(sitemResp, null, 2));
        return false;
      }

      return true;
    },

    updateshopitemsaccess: async (event) => {
      if (!event.arguments.sitemid || event.arguments.sitemid == '') {
        console.info('No item Id provided');
        return false;
      }
      const sitemId = event.arguments.sitemid;
      if (!event.arguments.newaccess || event.arguments.newaccess == '') {
        console.info('No valid access string provided');
        return false;
      }

      // admin is permitted to modify any quote item
      const isAdmin = event.identity.groups && event.identity.groups.includes('admin');
      if (!isAdmin) {
        // not admin: need to check permissions;
        // query ShopItem's current shop: verify the calling user can edit it
        const itemQuery = {
          query: queries.getShopItemsShopUsers,
          variables: { id: sitemId }
        };
        const sItem = await queryGraphQL(itemQuery);
        if (!sItem.data || !sItem.data.getShopItem || !sItem.data.getShopItem.shop) {
          // not a normal case for non-admin user: should not happen
          console.info('ShopItem is not linked to any shop:');
          console.info(JSON.stringify(sItem, null, 2));
          return false;
        }
        const sShop = sItem.data.getShopItem.shop;
        if (!sShop.owner || !sShop.shopadmins || !sShop.members) {
          console.info('Shop query did not return expected info:');
          console.info(JSON.stringify(sShop, null, 2));
          console.info(JSON.stringify(sItem, null, 2));
          return false;
        }
        const isShopAdmin = (event.identity.username == sShop.owner) || sShop.shopadmins.includes(event.identity.username);
        const isShopMember = sShop.members.includes(event.identity.username);
        if (!isShopAdmin && !isShopMember) {
          console.info(`User ${event.identity.username} is not an editor of this shop:`);
          console.info(JSON.stringify(sShop, null, 2));
          console.info(JSON.stringify(sItem, null, 2));
          return false;
        }
      }

      // update item's access setting
      const sitemUpdate = {
        query: queries.updateShopItemsAccess,
        variables: {
          input: {
            id: sitemId,
            access: event.arguments.newaccess,
          }
        }
      };
      const sitemResp = await queryGraphQL(sitemUpdate);
      if (!sitemResp.data || !sitemResp.data.updateShopItem || !sitemResp.data.updateShopItem.id) {
        console.info('Shop item update failed:');
        console.info(JSON.stringify(sitemResp, null, 2));
        return false;
      }

      return true;
    },
  }
};

exports.handler = async (event) => { //eslint-disable-line
  //console.log("Received event:", JSON.stringify(event, null, 2));

  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      const result = await resolver(event);
      return result;
    }
  }
};
