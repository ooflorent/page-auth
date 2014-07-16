var page = require('page');
var ctx = page.Context.prototype;

ctx.login = function(user) {
  if (this.session) {
    this.session.user = user;
  }

  this.user = user;
};

ctx.logout = function() {
  if (this.session) {
    this.session.user = null;
  }

  this.user = null;
};

ctx.isAuthenticated = function() {
  return this.user != null;
};

ctx.isUnauthenticated = function() {
  return this.user == null;
};

function auth(options) {
  return function(ctx, next) {
    if (ctx.session && ctx.session.user) {
      ctx.user = ctx.session.user;
    }

    next();
  };
}

module.exports = auth;
