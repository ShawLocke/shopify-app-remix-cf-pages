import '@shopify/shopify-api/adapters/cf-worker';
import {shopifyApi} from '@shopify/shopify-api';

export async function onRequest({request, env}) {
    console.log(JSON.stringify(env));
    const {searchParams} = new URL(request.url);

	const shopify = shopifyApi({
		apiKey: env.SHOPIFY_APP_KEY,
		apiSecretKey: env.SHOPIFY_APP_SECRET,
		scopes: env.SHOPIFY_APP_SCOPE.split(','),
		hostName: env.APP_HOSTNAME,
        isEmbeddedApp: true
	});
	
    return shopify.auth.begin({
        shop: shopify.utils.sanitizeShop(searchParams.get('shop'), true),
        callbackPath: '/oauth/callback',
        isOnline: false,
        rawRequest: request,
    });
}