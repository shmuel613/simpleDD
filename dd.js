angular.module('myApp.dd', [])
    .component('dd', {
        templateUrl: 'components/dd.html',
        controller: DdCtrl,
        controllerAs: 'dd',
        bindings: {
            placeholder: '@',
            data: '=',
            value: '=',
            onSelect: '&?'
        }
    });

function DdCtrl() {
    var self = this;
    var originalPlaceholder;
    this.openDd = false;
    this.toggleAllBool = false;
    this.filter = {
        text: ''
    };

    
    function init() {
        originalPlaceholder = self.placeholder;

        self.data.forEach(function(item) {
            item.dd = {
                checked: false
            };
        });
    }
    init();

    function updateValue() {
        self.value = self.data.filter(function(item) {
            return item.dd.checked;
        });
        updatePlaceholder(self.value);
        if(typeof self.onSelect === 'function') {
            self.onSelect(self.value);
        }
        return self.value;
    }

    function updatePlaceholder(val) {
        if(val && val.length) {
            self.placeholder = val.map(function(item) {
                return item.name;
            }).join(', ');
        } else {
            self.placeholder = originalPlaceholder;
        }
    }

    this.toggle = function(item) {
        item.dd.checked = !item.dd.checked;
        updateValue();
    };

    this.toggleAll = function() {
        this.toggleAllBool = !this.toggleAllBool;
        var toggleAllBool = this.toggleAllBool;
        var toggleData;

        if(this.filter.text !== '') {
            var filterText = this.filter.text;
            toggleData = this.data.filter(function(item) {
                return item.name.indexOf(filterText) !== -1;
            });
        } else {
            toggleData = this.data;
        }

        toggleData.forEach(function(item) {
            item.dd.checked = toggleAllBool;
        });
        updateValue();
    };
}