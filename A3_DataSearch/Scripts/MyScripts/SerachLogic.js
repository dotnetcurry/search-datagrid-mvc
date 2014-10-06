/// <reference path="../jquery-2.1.1.min.js" />
/// <reference path="../knockout-3.2.0.js" />

(function () {
    var SearchViewModel = function () {
        var self = this;

        self.Persons = ko.observableArray([]); //The PersonInfo Array

        self.FilterValue = ko.observable(); //The Filter value for Searching Person

        self.ErrorMessage = ko.observable("");

        var PersonInfo = {
            PersonFirstName: "",
            PersonLastName: "",
            Gender: "",
            City: "",
            District: "",
            State:""
        };

        self.Properties = ko.observableArray([]); //The Array of properties for the selection criteria

        //The Function Call
        loadProperties();

        //This function will read all properties
        //from the person object and display
        //them into the select element on the View
        function loadProperties() {
            for (prop in PersonInfo) {
                if (typeof PersonInfo[prop] !== 'function') {
                    self.Properties.push(prop);
                }
            }
        }

        self.Property = ko.observable(""); //For the Property Name selected
        self.SelectedProperty = ko.observable();

        var searchFlag = 0;
        //The Function for Selection of the Property for Search Criteria
        self.SelectedProperty.subscribe(function (val) {
            if (val !== 'undefined') {
                self.Property(val);
                searchFlag = 1;
            }
        });

        //self.PropertyValue = ko.observable();
        //self.PropertyValuesArray = ko.observableArray([]);

        //self.SetPropertyValues = function () {
        //    alert("ddfd");
        //    if (self.Property() !== '') {
        //        $.ajax({
        //            url: "/Person/" + self.Property(),
        //            type:"GET"
        //        }).done(function (resp) {
        //            self.PropertyValuesArray(resp);
        //        }).error(function (err) {
        //            self.ErrorMessage("Error!!" + err.status);
        //        });
        //    }
        //}



        
        

        loadPersons(); //Function Call

        //Function to Get All Persons
        function loadPersons() {
            $.ajax({
                url: "/Persons",
                type: "GET"
            }).done(function (resp) {
                self.Persons(resp);
            }).error(function (err) {
                self.ErrorMessage("Error " + err.status);
            });
        }


        //Make an ajax call to WEB API
        //And Put Data in Persons observablearray

        self.FilterValue.subscribe(function (val) {
            if (val !== 'undefined' || val !== '') {
                if (searchFlag === 1) {
                    var url = "/Persons/" + self.Property() + "/" + val;
                    $.ajax({
                        url: url,
                        type: "GET"
                    }).done(function (resp) {
                        self.Persons(resp);
                    }).error(function (err) {
                        self.ErrorMessage("Error " + err.status);
                    });
                } 
            }
            if (val === '')
            {
                loadPersons();
            }
        });

    };

    ko.applyBindings(new SearchViewModel());
})();