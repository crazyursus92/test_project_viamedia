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