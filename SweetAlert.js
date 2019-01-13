/**
 @fileOverview

 @toc

 */

(function (root, factory) {
    "use strict";

    /*global define*/
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'sweetalert'], factory);  // AMD
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('angular'), require('sweetalert')); // Node
    } else {
        factory(root.angular, root.swal);					// Browser
    }

}(this, function (angular, swal) {
    "use strict";

    angular.module('ngSweetAlert', [])
        .factory('SweetAlert', ['$rootScope', '$q', 'SweetAlertConfig', function ($rootScope, $q, SweetAlertConfig) {
            //public methods
            var self = {

                swal: ngSwal,
                success: function (title, message) {
                    return ngSwal(title, message, 'success');
                },
                error: function (title, message) {
                    return ngSwal(title, message, 'error');
                },
                warning: function (title, message) {
                    return ngSwal(title, message, 'warning');
                },
                info: function (title, message) {
                    return ngSwal(title, message, 'info');
                },
                showInputError: function (message) {
                    $rootScope.$evalAsync(function () {
                        swal.showInputError(message);
                    });
                },
                close: function () {
                    $rootScope.$evalAsync(function () {
                        swal.close();
                    });
                },
                getState: function () {
                    return swal.getState();
                },
                stopLoading: function () {
                    $rootScope.$evalAsync(function () {
                        swal.stopLoading();
                    });
                },
                setActionValue: function (val) {
                    $rootScope.$evalAsync(function () {
                        swal.setActionValue(val);
                    });
                }
            };

            return self;

            function ngSwal(arg1, arg2, arg3, arg4) {
                var def = $q.defer();
                //merge with default config
                if (typeof (arg1) === 'object') {
                    var arg1 = angular.extend(SweetAlertConfig, arg1);
                }
                debugger;
                var swalPromise;
                switch (arguments.length) {
                    case 1:
                        swalPromise = swal(arg1);
                        break;
                    case 2:
                        swalPromise = swal(arg1, arg2);
                        break;
                    case 3:
                        swalPromise = swal(arg1, arg2, arg3);
                        break;
                    case 4:
                    default:
                        swalPromise = swal(arg1, arg2, arg3, arg4);
                        break;
                }
                swalPromise
                    .then(function (result) {
                        def.resolve(result);
                    });

                return def.promise;
            }
        }])
        .constant('SweetAlertConfig', {
            title: '',
            text: '',
            icon: '',
            button: null,
            buttons: null,
            content: null,
            className: '',
            closeOnClickOutside: true,
            closeOnEsc: true,
            dangerMode: false,
            timer: null
        });
}));
