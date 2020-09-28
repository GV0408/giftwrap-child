let _history = null;

const setHistoryRef = (ref) => {
  _history = ((ref || {}).props || {}).history;
};

const pushRoute = routeName => {
  _history.push(routeName);
};

const replaceRoute = routeName => {
  _history.replace(routeName);
};

export default {
  setHistoryRef,
  pushRoute,
  replaceRoute,
}