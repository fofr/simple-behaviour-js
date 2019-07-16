describe('Simple behaviour', function() {
  "use strict";
  var Simple = window.Simple;

  it('finds modules', function() {
    var module = createModuleElement('a-module');
    document.body.appendChild(module);

    expect(Simple.modules.find().length).toBe(1);
    expect(Simple.modules.find()[0].matches('[data-module="a-module"]')).toBe(true);

    module.remove();
  });

  it('finds modules in a container', function() {
    var module = createModuleElement('a-module');
    var container = document.createElement('div');
    container.appendChild(module);

    expect(Simple.modules.find(container).length).toBe(1);
    expect(Simple.modules.find(container)[0].matches('[data-module="a-module"]')).toBe(true);
  });

  it('finds modules that are a container', function() {
    var module = createModuleElement('a-module');
    var container = createModuleElement('container-module');
    container.appendChild(module);

    expect(Simple.modules.find(container).length).toBe(2);
    expect(Simple.modules.find(container)[0].matches('[data-module="a-module"]')).toBe(true);
    expect(Simple.modules.find(container)[1].matches('[data-module="container-module"]')).toBe(true);
  });

  describe('when a module exists', function() {
    var callback;

    beforeEach(function() {
      callback = jasmine.createSpy();
      Simple.Modules.TestAlertModule = function(element) {
        this.start = function() {
          callback(element);
        }
      };
    });

    afterEach(function() {
      delete Simple.Modules.TestAlertModule;
    });

    it('starts modules within a container', function() {
      var module = createModuleElement('test-alert-module');
      var container = document.createElement('div');
      container.appendChild(module);

      Simple.modules.start(container);
      expect(callback).toHaveBeenCalled();
    });

    it('does not start modules that are already started', function() {
      var module = createModuleElement('test-alert-module');
      var container = document.createElement('div');
      container.appendChild(module);

      Simple.modules.start(module);
      Simple.modules.start(module);
      expect(callback.calls.count()).toBe(1);
    });

    it('passes the HTML element when initialising a module', function() {
      var module = createModuleElement('test-alert-module');
      var container = document.createElement('div');
      container.appendChild(module);

      Simple.modules.start(container);

      var args = callback.calls.argsFor(0);
      expect(args[0].matches('div[data-module="test-alert-module"]')).toBe(true);
    });

    it('starts all modules that are on the page', function() {
      var module1 = createModuleElement('test-alert-module');
      var module2 = createModuleElement('test-alert-module', 'span');
      var module3 = createModuleElement('test-alert-module', 'h2');
      var container = document.createElement('div');

      container.appendChild(module1);
      container.appendChild(module2);
      container.appendChild(module3);

      Simple.modules.start(container);
      expect(callback.calls.count()).toBe(3);
    });
  });

  function createModuleElement(name, element) {
    element = element || 'div';

    var module = document.createElement(element);
    module.setAttribute('data-module', name);

    return module;
  }
});
