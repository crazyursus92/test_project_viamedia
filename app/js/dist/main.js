var app = {};

app.config = {
    header: {
        container: '.header',
         mobileControl:{
            searchButton: ".mobile-control__search-icon",
            searchInput: ".mobile-control__search",
            buttonBurger: ".mobile-control__burger",
            classActive: "active"
         }
    },
    menu: {
        mainContainer: '.module-menu',
        container: '.menu',
        subMenu: '.menu__item-sub',
        subMenuClass: '.menu__sub-menu',
        classActive: "active",
        classFixed: "fixed"
    },
    catalog: {
        container: ".catalog-items",
        layoutDataName: 'layout',
        classActive: "active"
    }
};

app.header = {
    config: {},
    init: function (config) {
        this.config = config;
        if(typeof this.config === "object"){
            this.elementsInit();
            this.listener();
        }
    },
    elementsInit: function () {
        this.container = document.querySelector(this.config.container);
        this.searchButton = document.querySelector(this.config.mobileControl.searchButton);
        this.searchInput = document.querySelector(this.config.mobileControl.searchInput);
        this.buttonBurger = document.querySelector(this.config.mobileControl.buttonBurger);
    },
    listener: function () {
      this.searchButton.addEventListener("click", this.searchInputActive.bind(this));
      this.buttonBurger.addEventListener("click", app.menu.active.bind(app.menu));
    },
    searchInputActive: function () {
        if(this.searchInput.classList.contains(this.config.mobileControl.classActive)){
            this.searchInput.classList.remove(this.config.mobileControl.classActive);
        }else{
            this.searchInput.classList.add(this.config.mobileControl.classActive);
            this.searchInput.focus();
        }
    }
};

app.menu = {
    config: {},
    init: function (config) {
        this.config = config;
        if(this.config){
            this.elementsInit();
            this.listener();
        }
    },
    elementsInit: function () {
        this.container = document.querySelector(this.config.container);
        this.mainContainer = document.querySelector(this.config.mainContainer);
        this.subMenu = document.querySelectorAll(this.config.subMenu);
    },
    listener: function () {
        this.active = this.active.bind(this);
        for (var i = 0; i < this.subMenu.length; i++) {
            this.subMenu[i].addEventListener("click", this.subMenuActive.bind(this));
        }
        var menuWaypoint =  new Waypoint({
            element: this.mainContainer,
            handler: this.menuFixed.bind(this)
        });
    },
    active: function () {
        this.container.classList.toggle(this.config.classActive);
    },
    subMenuActive: function (e) {
        e.preventDefault();
        var obj = e.currentTarget.querySelector(this.config.subMenuClass);
        if(obj){
            e.currentTarget.classList.toggle(this.config.classActive);
            obj.classList.toggle(this.config.classActive);
        }
    },
    menuFixed: function (direction) {
        if(direction === "up"){

            this.mainContainer.classList.remove(this.config.classFixed);
            app.header.container.style.height = 'auto';
        }
        else {
            var height = app.header.container.clientHeight;
            app.header.container.style.height = height + "px";
            this.mainContainer.classList.add(this.config.classFixed);
        }
    }
};


app.catalog = {
    config: {},
    init: function (config) {
        this.config = config;
        if(this.config)
        this.container = document.querySelector(this.config.container);
        if(this.container){
            this.elementsInit();
            this.listener();
        }
    },
    elementsInit: function () {
        this.controlsLayout = document.querySelectorAll('[data-'+this.config.layoutDataName+']');
        this.layoutsName = [];
        //Собираем все название лайоутов в массив
        for (var i = 0; i < this.controlsLayout.length; i++) {
            var elem = this.controlsLayout[i];
            for(var dataName in elem.dataset){
                if(dataName === this.config.layoutDataName){
                    this.layoutsName.push(elem.dataset[dataName]);
                    break;
                }
            }
        }
    },
    listener: function () {
        for (var i = 0; i < this.controlsLayout.length; i++) {
            this.controlsLayout[i].addEventListener("click", this.changeLayout.bind(this));
        }
    },
    changeLayout: function (e) {
        e.preventDefault();
        var elem = e.currentTarget || e.target;
        var layoutName = '';
        //Ищем текущее имя лайаута
        for (var dataName in elem.dataset) {
            if (dataName === this.config.layoutDataName) {
                layoutName = elem.dataset[dataName];
                break;
            }
        }
        //Убираем клас active у всех контролов
        for (var i = 0; i < this.controlsLayout.length; i++) {
            this.controlsLayout[i].classList.remove(this.config.classActive);
        }
        //удаляем все имена лайатов у контейнира
        for (var i = 0; i < this.layoutsName.length; i++) {
            this.container.classList.remove(this.layoutsName[i]);
        }
        //Добовляем класс active кнопке
        elem.classList.add(this.config.classActive);
        //Добовляем класс лейаута контейнеру
        this.container.classList.add(layoutName);
    }
};


(function () {
   document.addEventListener('DOMContentLoaded', function () {
       app.header.init(app.config.header);
       app.menu.init(app.config.menu);
       app.catalog.init(app.config.catalog);
   });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IHt9O1xyXG5cclxuYXBwLmNvbmZpZyA9IHtcclxuICAgIGhlYWRlcjoge1xyXG4gICAgICAgIGNvbnRhaW5lcjogJy5oZWFkZXInLFxyXG4gICAgICAgICBtb2JpbGVDb250cm9sOntcclxuICAgICAgICAgICAgc2VhcmNoQnV0dG9uOiBcIi5tb2JpbGUtY29udHJvbF9fc2VhcmNoLWljb25cIixcclxuICAgICAgICAgICAgc2VhcmNoSW5wdXQ6IFwiLm1vYmlsZS1jb250cm9sX19zZWFyY2hcIixcclxuICAgICAgICAgICAgYnV0dG9uQnVyZ2VyOiBcIi5tb2JpbGUtY29udHJvbF9fYnVyZ2VyXCIsXHJcbiAgICAgICAgICAgIGNsYXNzQWN0aXZlOiBcImFjdGl2ZVwiXHJcbiAgICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZW51OiB7XHJcbiAgICAgICAgbWFpbkNvbnRhaW5lcjogJy5tb2R1bGUtbWVudScsXHJcbiAgICAgICAgY29udGFpbmVyOiAnLm1lbnUnLFxyXG4gICAgICAgIHN1Yk1lbnU6ICcubWVudV9faXRlbS1zdWInLFxyXG4gICAgICAgIHN1Yk1lbnVDbGFzczogJy5tZW51X19zdWItbWVudScsXHJcbiAgICAgICAgY2xhc3NBY3RpdmU6IFwiYWN0aXZlXCIsXHJcbiAgICAgICAgY2xhc3NGaXhlZDogXCJmaXhlZFwiXHJcbiAgICB9LFxyXG4gICAgY2F0YWxvZzoge1xyXG4gICAgICAgIGNvbnRhaW5lcjogXCIuY2F0YWxvZy1pdGVtc1wiLFxyXG4gICAgICAgIGxheW91dERhdGFOYW1lOiAnbGF5b3V0JyxcclxuICAgICAgICBjbGFzc0FjdGl2ZTogXCJhY3RpdmVcIlxyXG4gICAgfVxyXG59O1xyXG5cclxuYXBwLmhlYWRlciA9IHtcclxuICAgIGNvbmZpZzoge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuY29uZmlnID09PSBcIm9iamVjdFwiKXtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50c0luaXQoKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlbGVtZW50c0luaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb25maWcuY29udGFpbmVyKTtcclxuICAgICAgICB0aGlzLnNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb25maWcubW9iaWxlQ29udHJvbC5zZWFyY2hCdXR0b24pO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29uZmlnLm1vYmlsZUNvbnRyb2wuc2VhcmNoSW5wdXQpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbmZpZy5tb2JpbGVDb250cm9sLmJ1dHRvbkJ1cmdlcik7XHJcbiAgICB9LFxyXG4gICAgbGlzdGVuZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5zZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc2VhcmNoSW5wdXRBY3RpdmUuYmluZCh0aGlzKSk7XHJcbiAgICAgIHRoaXMuYnV0dG9uQnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhcHAubWVudS5hY3RpdmUuYmluZChhcHAubWVudSkpO1xyXG4gICAgfSxcclxuICAgIHNlYXJjaElucHV0QWN0aXZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYodGhpcy5zZWFyY2hJbnB1dC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jb25maWcubW9iaWxlQ29udHJvbC5jbGFzc0FjdGl2ZSkpe1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25maWcubW9iaWxlQ29udHJvbC5jbGFzc0FjdGl2ZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQuY2xhc3NMaXN0LmFkZCh0aGlzLmNvbmZpZy5tb2JpbGVDb250cm9sLmNsYXNzQWN0aXZlKTtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmFwcC5tZW51ID0ge1xyXG4gICAgY29uZmlnOiB7fSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICBpZih0aGlzLmNvbmZpZyl7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHNJbml0KCk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZWxlbWVudHNJbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29uZmlnLmNvbnRhaW5lcik7XHJcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbmZpZy5tYWluQ29udGFpbmVyKTtcclxuICAgICAgICB0aGlzLnN1Yk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuY29uZmlnLnN1Yk1lbnUpO1xyXG4gICAgfSxcclxuICAgIGxpc3RlbmVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLmFjdGl2ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdWJNZW51Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViTWVudVtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdWJNZW51QWN0aXZlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbWVudVdheXBvaW50ID0gIG5ldyBXYXlwb2ludCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMubWFpbkNvbnRhaW5lcixcclxuICAgICAgICAgICAgaGFuZGxlcjogdGhpcy5tZW51Rml4ZWQuYmluZCh0aGlzKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGFjdGl2ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUodGhpcy5jb25maWcuY2xhc3NBY3RpdmUpO1xyXG4gICAgfSxcclxuICAgIHN1Yk1lbnVBY3RpdmU6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBvYmogPSBlLmN1cnJlbnRUYXJnZXQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbmZpZy5zdWJNZW51Q2xhc3MpO1xyXG4gICAgICAgIGlmKG9iail7XHJcbiAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY29uZmlnLmNsYXNzQWN0aXZlKTtcclxuICAgICAgICAgICAgb2JqLmNsYXNzTGlzdC50b2dnbGUodGhpcy5jb25maWcuY2xhc3NBY3RpdmUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZW51Rml4ZWQ6IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcclxuICAgICAgICBpZihkaXJlY3Rpb24gPT09IFwidXBcIil7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1haW5Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNvbmZpZy5jbGFzc0ZpeGVkKTtcclxuICAgICAgICAgICAgYXBwLmhlYWRlci5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IGFwcC5oZWFkZXIuY29udGFpbmVyLmNsaWVudEhlaWdodDtcclxuICAgICAgICAgICAgYXBwLmhlYWRlci5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5Db250YWluZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmNvbmZpZy5jbGFzc0ZpeGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuYXBwLmNhdGFsb2cgPSB7XHJcbiAgICBjb25maWc6IHt9LFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIGlmKHRoaXMuY29uZmlnKVxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbmZpZy5jb250YWluZXIpO1xyXG4gICAgICAgIGlmKHRoaXMuY29udGFpbmVyKXtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50c0luaXQoKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlbGVtZW50c0luaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzTGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtJyt0aGlzLmNvbmZpZy5sYXlvdXREYXRhTmFtZSsnXScpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0c05hbWUgPSBbXTtcclxuICAgICAgICAvL9Ch0L7QsdC40YDQsNC10Lwg0LLRgdC1INC90LDQt9Cy0LDQvdC40LUg0LvQsNC50L7Rg9GC0L7QsiDQsiDQvNCw0YHRgdC40LJcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29udHJvbHNMYXlvdXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzLmNvbnRyb2xzTGF5b3V0W2ldO1xyXG4gICAgICAgICAgICBmb3IodmFyIGRhdGFOYW1lIGluIGVsZW0uZGF0YXNldCl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhTmFtZSA9PT0gdGhpcy5jb25maWcubGF5b3V0RGF0YU5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0c05hbWUucHVzaChlbGVtLmRhdGFzZXRbZGF0YU5hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsaXN0ZW5lcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb250cm9sc0xheW91dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzTGF5b3V0W2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNoYW5nZUxheW91dC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2hhbmdlTGF5b3V0OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgZWxlbSA9IGUuY3VycmVudFRhcmdldCB8fCBlLnRhcmdldDtcclxuICAgICAgICB2YXIgbGF5b3V0TmFtZSA9ICcnO1xyXG4gICAgICAgIC8v0JjRidC10Lwg0YLQtdC60YPRidC10LUg0LjQvNGPINC70LDQudCw0YPRgtCwXHJcbiAgICAgICAgZm9yICh2YXIgZGF0YU5hbWUgaW4gZWxlbS5kYXRhc2V0KSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhTmFtZSA9PT0gdGhpcy5jb25maWcubGF5b3V0RGF0YU5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGxheW91dE5hbWUgPSBlbGVtLmRhdGFzZXRbZGF0YU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/Qo9Cx0LjRgNCw0LXQvCDQutC70LDRgSBhY3RpdmUg0YMg0LLRgdC10YUg0LrQvtC90YLRgNC+0LvQvtCyXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvbnRyb2xzTGF5b3V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHNMYXlvdXRbaV0uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNvbmZpZy5jbGFzc0FjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v0YPQtNCw0LvRj9C10Lwg0LLRgdC1INC40LzQtdC90LAg0LvQsNC50LDRgtC+0LIg0YMg0LrQvtC90YLQtdC50L3QuNGA0LBcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGF5b3V0c05hbWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmxheW91dHNOYW1lW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/QlNC+0LHQvtCy0LvRj9C10Lwg0LrQu9Cw0YHRgSBhY3RpdmUg0LrQvdC+0L/QutC1XHJcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKHRoaXMuY29uZmlnLmNsYXNzQWN0aXZlKTtcclxuICAgICAgICAvL9CU0L7QsdC+0LLQu9GP0LXQvCDQutC70LDRgdGBINC70LXQudCw0YPRgtCwINC60L7QvdGC0LXQudC90LXRgNGDXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZChsYXlvdXROYW1lKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgYXBwLmhlYWRlci5pbml0KGFwcC5jb25maWcuaGVhZGVyKTtcclxuICAgICAgIGFwcC5tZW51LmluaXQoYXBwLmNvbmZpZy5tZW51KTtcclxuICAgICAgIGFwcC5jYXRhbG9nLmluaXQoYXBwLmNvbmZpZy5jYXRhbG9nKTtcclxuICAgfSk7XHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
