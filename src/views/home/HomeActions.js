
const HomeActions = {

    loadContent(context) {
      console.log("first actions");
      context.dispatch('LOAD_CONTENT');
    },
    incrementCount(context, payload) {
      console.log('increment it');
      context.dispatch('INCREMENT_COUNT', payload);
    }


};

export default HomeActions;
