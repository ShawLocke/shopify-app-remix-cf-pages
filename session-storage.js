import { Session } from '@shopify/shopify-api';

async function getSession(context, shop) {
    console.log('getSession', JSON.stringify(context), JSON.stringify(shop));

    const sessionProperties = await context.SESSIONS.get(
       context.shopify.session.getOfflineId(shop),
       { type: 'json' }
    );
  
    if (!sessionProperties) {
      return null;
    }
  
    const session = Session.fromPropertyArray(sessionProperties);
    return session;
  }


async function saveSession(context, session){
  console.log('saveSession', JSON.stringify(context), JSON.stringify(session));

  return await context.SESSIONS.put(session.id, JSON.stringify(session.toPropertyArray()));
}

async function deleteSession(context, shop){
  console.log('deleteSession', JSON.stringify(context), JSON.stringify(shop));

  return await context.SESSIONS.delete(
    context.shopify.session.getOfflineId(shop)
  );

}
export { deleteSession, getSession, saveSession }