const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"test":{"uri":"test","methods":["GET","HEAD"]},"dashboard":{"uri":"dashboard","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"password.confirm":{"uri":"confirm-password","methods":["GET","HEAD"]},"logout":{"uri":"logout","methods":["POST"]},"storage.local":{"uri":"storage\/{path}","methods":["GET","HEAD"],"wheres":{"path":".*"},"parameters":["path"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
