(function(root) {
  "use strict";
  root.Simple = root.Simple || {};
  Simple.Modules = Simple.Modules || {};

  Simple.modules = {
    find: function(container) {
      var modules,
          moduleSelector = '[data-module]',
          container = container || document.body;

      modules = Array.prototype.slice.call(container.querySelectorAll(moduleSelector));

      // Container could be a module too
      if (container.matches(moduleSelector)) {
        modules.push(container);
      }

      return modules;
    },

    start: function(container) {
      var modules = this.find(container);

      for (var i = 0, l = modules.length; i < l; i++) {
        var module,
            element = modules[i],
            type = camelCaseAndCapitalise(element.getAttribute('data-module')),
            started = element.hasAttribute('data-module-started');

        if (typeof Simple.Modules[type] === "function" && !started) {
          module = new Simple.Modules[type](element);
          module.start();
          element.setAttribute('data-module-started', true);
        }
      }

      // eg selectable-table to SelectableTable
      function camelCaseAndCapitalise(string) {
        return capitaliseFirstLetter(camelCase(string));
      }

      // http://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase
      function camelCase(string) {
        return string.replace(/-([a-z])/g, function (g) {
          return g[1].toUpperCase();
        });
      }

      // http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
      function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    }
  }
})(window);
