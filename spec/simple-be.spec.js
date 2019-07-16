describe('Simple behaviour', function() {
  "use strict";
  var SimpleBe = window.SimpleBe;

  it('finds modules', function() {
    var module = document.createElement('div');
    module.setAttribute('data-module', 'a-module');
    document.body.appendChild(module);

    expect(SimpleBe.modules.find().length).toBe(1);
    expect(SimpleBe.modules.find()[0].matches('[data-module="a-module"]')).toBe(true);

    module.remove();
  });

  it('finds modules in a container', function() {
    var module = document.createElement('div');
    var container = document.createElement('div');

    module.setAttribute('data-module', 'a-module');
    container.appendChild(module);

    expect(SimpleBe.modules.find(container).length).toBe(1);
    expect(SimpleBe.modules.find(container)[0].matches('[data-module="a-module"]')).toBe(true);
  });

  it('finds modules that are a container', function() {
    var module = document.createElement('div');
    var container = document.createElement('div');

    module.setAttribute('data-module', 'a-module');
    container.setAttribute('data-module', 'container-module');
    container.appendChild(module);

    expect(SimpleBe.modules.find(container).length).toBe(2);
    expect(SimpleBe.modules.find(container)[0].matches('[data-module="a-module"]')).toBe(true);
    expect(SimpleBe.modules.find(container)[1].matches('[data-module="container-module"]')).toBe(true);
  });

  describe('when a module exists', function() {
    var callback;

    beforeEach(function() {
      callback = jasmine.createSpy();
      SimpleBe.Modules.TestAlertModule = function(element) {
        this.start = function() {
          callback(element);
        }
      };
    });

    afterEach(function() {
      delete SimpleBe.Modules.TestAlertModule;
    });

    it('starts modules within a container', function() {
      var module = document.createElement('div');
      var container = document.createElement('div');

      module.setAttribute('data-module', 'test-alert-module');
      container.appendChild(module);

      SimpleBe.modules.start(container);
      expect(callback).toHaveBeenCalled();
    });

    it('does not start modules that are already started', function() {
      var module = document.createElement('div');
      var container = document.createElement('div');

      module.setAttribute('data-module', 'test-alert-module');
      container.appendChild(module);

      SimpleBe.modules.start(module);
      SimpleBe.modules.start(module);
      expect(callback.calls.count()).toBe(1);
    });

    it('passes the HTML element when initialising a module', function() {
      var module = document.createElement('div');
      var container = document.createElement('div');

      module.setAttribute('data-module', 'test-alert-module');
      container.appendChild(module);

      SimpleBe.modules.start(container);

      var args = callback.calls.argsFor(0);
      expect(args[0].matches('div[data-module="test-alert-module"]')).toBe(true);
    });

    it('starts all modules that are on the page', function() {
      var module1 = document.createElement('div');
      var module2 = document.createElement('h2');
      var module3 = document.createElement('span');
      var container = document.createElement('div');

      module1.setAttribute('data-module', 'test-alert-module');
      module2.setAttribute('data-module', 'test-alert-module');
      module3.setAttribute('data-module', 'test-alert-module');

      container.appendChild(module1);
      container.appendChild(module2);
      container.appendChild(module3);

      SimpleBe.modules.start(container);
      expect(callback.calls.count()).toBe(3);
    });
  });
});
