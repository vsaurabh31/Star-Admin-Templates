var app = angular.module("hbcadminApp", ["ngRoute","ngNotify",'textAngular','ngSanitize']);
var token = "f05a5a675fab54ca8380738eb447a0edfc990b1e";
var urlApi="http://raffle-escale.herokuapp.com/";
app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "home.html",
        controller: 'dashCtrl'
    })
    .when("/packages", {
        templateUrl : "pages/package/package.html",
        controller: 'packageCtrl'
    })
    .when("/create-package", {
        templateUrl : "pages/package/create-package.html",
        controller: 'create_package_Ctrl'
    })
     .when("/packages/:id", {
         templateUrl : "pages/package/edit-package.html",
        controller: 'packageEditCtrl'
     })
    .when("/deals", {
       templateUrl : "pages/deal/deal.html",
       controller: 'dealCtrl'
     })
    .when("/create-deal", {
       templateUrl : "pages/deal/create-deal.html",
       controller: 'create_deal_Ctrl'
     })
    .when("/deals/:id", {
         templateUrl : "pages/deal/edit-deal.html",
          controller: 'dealEditCtrl'
     })
      .when("/login", {
        templateUrl : "pages/samples/login.html",
         controller: 'loginCtrl'
      })
     .when("/category", {
         templateUrl : "pages/category/category.html",
         controller: 'categoryCtrl'
     })
     .when("/create-category", {
       templateUrl : "pages/category/create-category.html",
       controller: 'create_category_Ctrl'
     })
     // .when("/sub-category", {
     //     templateUrl : "pages/subcategory/sub-category.html",
     //     controller: 'sub-catagoryCtrl'
     // })
     $locationProvider.html5Mode(true);
});

app.run(function($rootScope,$location) {
    var loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
    $rootScope.userName=localStorage.getItem("user");
    $rootScope.user_type=localStorage.getItem("user_type");
    
    if(loginStatus) {
        console.log("i am login route",loginStatus);
        $rootScope.islogin = true;
        return $location.path( "home" );
    } else {
      console.log("i am not logged in")
        return $location.path( "login" );
        $rootScope.islogin = false;
    }
     $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if (loginStatus == null ) {
        // no logged user, we should be going to #login
        return  $location.path("login");
      } else {
        
      }        
    });
    
})
app.factory('notiService', function(ngNotify) {
    return {
        success: function(x) {
            ngNotify.set(x, {
                theme: 'pure',
                position: 'top',
                duration: 3000,
                sticky: false,
                html: true,
                type: 'success'
            });
        },
        error: function(x) {
            ngNotify.set(x, {
                theme: 'pure',
                position: 'top',
                duration: 3000,
                sticky: false,
                html: true,
                type: 'error'
            });
        },
        warning: function (x) {
            ngNotify.set(x, {
                theme: 'pure',
                position: 'top',
                duration: 3000,
                sticky: false,
                html: true,
                type: 'info'
            });
        }

    }
});
 
app.controller('loginCtrl', function ($scope,$http,ngNotify,$rootScope,$location) {
    console.log("helo")
    $scope.formData = {};
    //$scope.showRegister = false;
    $scope.showData=false;
    $scope.login = function () {
        console.log("heloo")
        $rootScope.isLoader = true;
        var dataObj = {
            "email":$scope.formData.email,
            "password":$scope.formData.password
        };

        $http({
            "url": urlApi + "account/loginUser/",
            "method": "POST",
            "data":dataObj,
        }).then(function(response) {
            $rootScope.isLoader = false;
            console.log(response.data.status);
            if (response.data.status == 'success') {
                $rootScope.islogin = true;
                console.log(response.data)
                ngNotify.set(response.data.message, {
                    theme: 'pure',
                    position: 'top',
                    duration: 3000,
                    sticky: false,
                    html: true,
                    type: 'success'
                });
                localStorage.setItem('loginStatus',true);
                localStorage.setItem('access_token',response.data.token);
                localStorage.setItem('user_type', response.data.user_type);
                localStorage.setItem('user', response.data.user.first_name + ' ' + response.data.user.last_name);
                 var test = localStorage.getItem("user_type");
                 console.log(test);
                $location.path("home");
            }
            else if(response.data.status == 'failure') {
                console.log("Hello")
                ngNotify.set(response.data.message, {
                    theme: 'pure',
                    position: 'top',
                    duration: 3000,
                    sticky: false,
                    html: true,
                    type: 'error'
                });
            }

        }).catch(function(response) {
            console.log(response.data);
        })
    };
});
app.controller('logoutCtrl', function($scope,$location) {
    $scope.logout = function () {
        localStorage.clear();
        return  window.location.reload();
    };
});

app.factory('PackageService', function($http) {
    let isAuthenticated = false;
    return {
      createPackage: function(data) {
            let promise;
            if (promise) {
            } else {
                promise = $http({
                    "async": true,
                    "crossDomain": true,
                    "url": urlApi + "packages/addpackage/",
                    "method": "POST",
                    "processData": false,
                    "data": data,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token
                    }
                }).then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return response.data;
                });
                return promise
            }
        },
        createDeal: function(data) {
            let promise;
            if (promise) {
            } else {
                promise = $http({
                    "async": true,
                    "crossDomain": true,
                    "url": urlApi + "packages/addraffle/",
                    "method": "POST",
                    "processData": false,
                    "data": data,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token
                    }
                }).then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return response.data;
                });
                return promise
            }
        },
        createCategory: function(data) {
            let promise;
            if (promise) {
            } else {
                promise = $http({
                    "async": true,
                    "crossDomain": true,
                    "url": urlApi + "packages/addcategory/",
                    "method": "POST",
                    "processData": false,
                    "data": data,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token
                    }
                }).then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return response.data;
                });
                return promise
            }
        },
         updatePackage: function (data) {
            let promise;
            if (promise) {
            } else {
                promise = $http({
                    "async": true,
                    "crossDomain": true,
                    "url": urlApi + "packages/updatepackage/",
                    "method": "POST",
                    "data":data,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token 
                    }
                }).then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return response.data;
                });
                return promise
            }
        },
       
        updateDeal: function (data) {
            let promise;
            if (promise) {
            } else {
                promise = $http({
                    "async": true,
                    "crossDomain": true,
                    "url": urlApi + "packages/updateraffle/",
                    "method": "POST",
                    "data":data,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token 
                    }
                }).then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return response.data;
                });
                return promise
            }
        },

         updateCategory: function (data) {
            let promise;
            if (promise) {
            } else {
                promise = $http({
                    "async": true,
                    "crossDomain": true,
                    "url": urlApi + "packages/updatecategory/",
                    "method": "POST",
                    "data":data,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token 
                    }
                }).then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return response.data;
                });
                return promise
            }
        },


        getPackageById: function(data) {
            let promise;
            if (promise) {
            } else {
                promise = $http({
                    "async": true,
                    "crossDomain": true,
                    "url": urlApi + "packages/getPackageById/",
                    "method": "POST",
                    "processData": false,
                    "data": data,
                    "headers": {
                        "Content-Type": "application/json",
                    }
                }).then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return response.data;
                });
                return promise
            }
        },

        getDealById: function(data) {
            let promise;
            if (promise) {
            } else {
                promise = $http({
                    "async": true,
                    "crossDomain": true,
                    "url": urlApi + "packages/getRaffleById/",
                    "method": "POST",
                    "processData": false,
                    "data": data,
                    "headers": {
                        "Content-Type": "application/json",
                    }
                }).then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return response.data;
                });
                return promise
            }
        },
        // getCategoryById: function(data) {
        //     let promise;
        //     if (promise) {
        //     } else {
        //         promise = $http({
        //             "async": true,
        //             "crossDomain": true,
        //             "url": urlApi + "packages/getCategoryById/",
        //             "method": "POST",
        //             "processData": false,
        //             "data": data,
        //             "headers": {
        //                 "Content-Type": "application/json",
        //             }
        //         }).then(function (response) {
        //             return response.data;
        //         }).catch(function (response) {
        //             return response.data;
        //         });
        //         return promise
        //     }
        // },
        getAllPackage: function() {
            let promise;
            if (promise) {
            } else {
                promise = $http({
                    "async": true,
                    "crossDomain": true,
                    "url": urlApi + "packages/getAllPackages/",
                    "method": "GET",
                    "processData": false,
                    "headers": {
                        "Content-Type": "application/json",
                       "Authorization": "Token " + token 
                    }
                }).then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return response.data;
                });
                return promise
            }
        },
        getAllDeal: function() {
            let promise;
            if (promise) {
            } else {
                promise = $http({
                    "async": true,
                    "crossDomain": true,
                    "url": urlApi + "packages/getAllRaffle/",
                    "method": "GET",
                    "processData": false,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token 
                    }
                }).then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return response.data;
                });
                return promise
            }
        },
        getAllCategory: function() {
            let promise;
            if (promise) {
            } else {
                promise = $http({
                    "async": true,
                    "crossDomain": true,
                    "url": urlApi + "packages/getAllCategory/",
                    "method": "GET",
                    "processData": false,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token 
                    }
                }).then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return response.data;
                });
                return promise
            }
        },
        // getAllSubCategory: function() {
        //     let promise;
        //     if (promise) {
        //     } else {
        //         promise = $http({
        //             "async": true,
        //             "crossDomain": true,
        //             "url": urlApi + "packages/getAllSubCategory/",
        //             "method": "GET",
        //             "processData": false,
        //             "headers": {
        //                 "Content-Type": "application/json",
        //                 "Authorization": "Token 228b64c346732c056ccab435f9523ec0e8ae3797" 
        //             }
        //         }).then(function (response) {
        //             return response.data;
        //         }).catch(function (response) {
        //             return response.data;
        //         });
        //         return promise
        //     }
        // },
    }
});
app.controller('dashCtrl', function ($scope,PackageService,$http) {
  console.log("helo")
PackageService.getAllPackage().then(
           function (payload) {
              console.log(payload);
            if(payload.status == 'success') {
              $scope.allPackage = payload.data;
            }
           }
       );
PackageService.getAllDeal().then(
           function (payload) {
              console.log(payload);
            if(payload.status == 'success') {
              $scope.allDeal = payload.data;
            }
           }
       );
PackageService.getAllCategory().then(
           function (payload) {
              console.log(payload);
            if(payload.status == 'success') {
              $scope.allCategory = payload.data;
            }

           } 
       );
// PackageService.getAllSubCategory().then(
//            function (payload) {
//               console.log(payload);
//             if(payload.status == 'success') {
//               $scope.allSubCategory = payload.data;
//             }

//            } 
//        );
$scope.removePackage = function(index){  
    console.log(index);
   var dataObj = {
    "id":index.id
   };
     if(confirm("Are You sure delete this")){
          console.log();
                 $http({
                        "async": true,
                        "crossDomain": true,
                        "url": urlApi + "packages/deletepackage/",
                        "method": "POST",
                        "processData": false,
                        "data":dataObj,
                        "headers":{
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token 
                    }    
             }).then(function(response) {
                  console.log(response);
                  if (response.data.status == 'success') {
                    $scope.allPackage.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
                  });
            }        
  };

$scope.removeDeals = function(index){  
    console.log(index);
   var dataObj = {
    "id":index.id
   };
     if(confirm("Are You sure delete this")){
          console.log();
                 $http({
                        "async": true,
                        "crossDomain": true,
                        "url": urlApi + "packages/deleteraffle/",
                        "method": "POST",
                        "processData": false,
                        "data":dataObj,
                        "headers":{
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token 
                    }    
             }).then(function(response) {
                  console.log(response);
                  if (response.data.status == 'success') {
                    $scope.allDeal.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
                  });
            }        
  };


 $scope.removeCategory = function(index){  
    console.log(index);
   var dataObj = {
    "id":index.id
   };
     if(confirm("Are You sure delete this")){
          console.log();
                 $http({
                        "async": true,
                        "crossDomain": true,
                        "url": urlApi + "packages/deletecategory/",
                        "method": "POST",
                        "processData": false,
                        "data":dataObj,
                        "headers":{
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token 
                    }    
             }).then(function(response) {
                  console.log(response);
                  if (response.data.status == 'success') {
                    $scope.allCategory.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
                  });
            }        
      };
 // $scope.removeSubCategory = function(index){  
 //    console.log(index);
 //   var dataObj = {
 //    "id":index.id
 //   };
 //     if(confirm("Are You sure delete this")){
 //          console.log();
 //                 $http({
 //                        "async": true,
 //                        "crossDomain": true,
 //                        "url": urlApi + "packages/deleteSubCatagory/",
 //                        "method": "POST",
 //                        "processData": false,
 //                        "data":dataObj,
 //                        "headers":{
 //                        "Content-Type": "application/json",
 //                        "Authorization": "Token 228b64c346732c056ccab435f9523ec0e8ae3797" 
 //                    }    
 //             }).then(function(response) {
 //                  console.log(response);
 //                  if (response.data.status == 'success') {
 //                    $scope.allReports.splice(index, 1);
 //                    return true;
 //                } else {
 //                    return false;
 //                }
 //                  });
 //            }        
 //      };
  });
app.controller('packageCtrl', function ($scope,PackageService,$http) {
  console.log("helo technology")
PackageService.getAllPackage().then(
           function (payload) {
              console.log(payload);
            if(payload.status == 'success') {
              $scope.allPackage = payload.data;
            }
           }
       );
$scope.removePackage = function(index){  
    console.log(index);
   var dataObj = {
    "id":index.id
   };
     if(confirm("Are You sure delete this")){
          console.log();
                 $http({
                        "async": true,
                        "crossDomain": true,
                        "url": urlApi + "packages/deletepackage/",
                        "method": "POST",
                        "processData": false,
                        "data":dataObj,
                        "headers":{
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token 
                    }    
             }).then(function(response) {
                  console.log(response);
                  if (response.data.status == 'success') {
                    $scope.allPackage.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
                  });
            }        
  };
});

app.controller('dealCtrl', function ($scope,PackageService,$http) {
  console.log("helo")
PackageService.getAllDeal().then(
           function (payload) {
              console.log(payload);
            if(payload.status == 'success') {
              $scope.allDeal = payload.data;
            }
           }
       );
$scope.removeDeal = function(index){  
    console.log(index);
   var dataObj = {
    "id":index.id
   };
     if(confirm("Are You sure delete this")){
          console.log();
                 $http({
                        "async": true,
                        "crossDomain": true,
                        "url": urlApi + "packages/deleteraffle/",
                        "method": "POST",
                        "processData": false,
                        "data":dataObj,
                        "headers":{
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token  
                    }    
             }).then(function(response) {
                  console.log(response);
                  if (response.data.status == 'success') {
                    $scope.allDeal.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
                  });
            }        
  };

});
app.controller('categoryCtrl', function ($scope,PackageService,$http) {
  console.log("helo")
PackageService.getAllCategory().then(
           function (payload) {
              console.log(payload);
            if(payload.status == 'success') {
              $scope.allCategory = payload.data;
            }
           }
       );
$scope.removeCategory = function(index){  
    console.log(index);
   var dataObj = {
    "id":index.id
   };
     if(confirm("Are You sure delete this")){
          console.log();
                 $http({
                        "async": true,
                        "crossDomain": true,
                        "url": urlApi + "packages/deletecategory/",
                        "method": "POST",
                        "processData": false,
                        "data":dataObj,
                        "headers":{
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token 
                    }    
             }).then(function(response) {
                  console.log(response);
                  if (response.data.status == 'success') {
                    $scope.allCategory.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
                  });
            }        
      };
});
app.factory('ImageUpload', function ($http,$q) {
    return {
        open: function() {
            let deferred = $q.defer();
            cloudinary.openUploadWidget({ cloud_name: 'zoommyprice', upload_preset: 'zoomdash', folder: 'zoom_dash'},
                function(error, result) {
                    let i = result;
                    deferred.resolve(i);
                    console.log(error, result)
                });
            return deferred.promise;
        }
    }

});
app.controller('packageEditCtrl', function($scope,$routeParams,PackageService,$rootScope,notiService,ImageUpload,$location) {
    console.log($routeParams);
    $rootScope.attachments = [];
    $scope.formData = {};
     PackageService.getAllPackage().then(
           function (payload) {
              console.log(payload);
            if(payload.status == 'success') {
              $scope.allPackage = payload.data;
            }
           }
       );
    if($routeParams != '') {
       PackageService.getPackageById($routeParams).then(
           function (payload) {
               $scope.isLoader = false;
               console.log(payload);
               if(payload.status == 'success') {
                  $rootScope.listImages = payload.data.image;
                  console.log($rootScope.listImages)
                  $rootScope.attachments.push(payload.data.attachment);
                  $scope.formData.category_id = payload.data.category.id;
                  $scope.formData.subcategory_id = payload.data.subcategory.id;
                  $scope.formData.location_id = payload.data.location.id;
                  $scope.formData.name = payload.data.name;
                  $scope.formData.subtitle = payload.data.subtitle;
                  $scope.formData.description = payload.data.description;
                  $scope.formData.currency_id = payload.data.currency.id;
                  $scope.formData.price = payload.data.price;
                  console.log($scope.formData.category_id);
               }
           }
       );
   }
    $rootScope.filenames = [];
    $scope.Attach = function() {
        $scope.isLoader = true;
        ImageUpload.open().then(
            function (payload) {
                $scope.isLoader = false;
                for (i = 0; i < payload.length; i++) {
                    $scope.showAttachments = true;
                    $rootScope.filenames.push(payload[i]);
                    $rootScope.attachments.push(payload[i].url);
                    console.log($rootScope.filenames);
                }
            }
        )
    };
    $scope.UploadImg = function() {
        $scope.isLoader = true;
        ImageUpload.open().then(
            function (payload) {
                console.log(payload)
                $scope.isLoader = false;
                $rootScope.listImages = payload[0].url;
                $rootScope.showUpload = true;
                console.log($rootScope.listImages)
            }
        )
    };
     $scope.updatePackage = function() {
       $scope.isLoader = true; 
       if($rootScope.listImages ==  undefined) {
           notiService.error("Please enter all fields")
       } else {
            var dataObj = {
               "images": $rootScope.listImages,
               "cover_image": $rootScope.attachments.toString(),
               "category_id":$scope.formData.category_id,
               "currency_id":$scope.formData.currency_id,
               "location_id":$scope.formData.location_id,
               "subcategory_id":$scope.formData.subcategory_id,
               "name": $scope.formData.name,
               "subtitle": $scope.formData.subtitle,
               "description": $scope.formData.description,
               "price": $scope.formData.price
           };
           console.log(dataObj);
           PackageService.updatePackage(dataObj).then(
               function (payload) {
                   if(payload.status =='success') {
                       notiService.success(payload.message)
                       return  $location.path("home");
                       
                   }
                   console.log(payload);
               }
           );
       }

   };
})
app.controller('dealEditCtrl', function ($scope,$routeParams,$rootScope,notiService,PackageService,$location) {
    console.log("helo")
    $scope.formData = {};
    $rootScope.attachments = [];
   console.log($routeParams)
   PackageService.getAllDeal().then(
           function (payload) {
              console.log(payload);
            if(payload.status == 'success') {
              $scope.allDeal = payload.data;
            }
           }
       );
    if($routeParams != '') {
        $scope.editButton = true;
        PackageService.getDealById($routeParams).then(
            function (payload) {
                $scope.isLoader = false;
                console.log(payload);
                if(payload.status == 'success') {
                    $scope.formData.package_id = payload.data.package_id.id;
                    $scope.formData.name = payload.data.name;
                    $scope.formData.start_time = payload.data.start_time;
                    $scope.formData.end_time = payload.data.end_time;
                }
            }
        );
    }

     $scope.updateDeal = function() {
        $scope.isLoader = true;
        var dataObj = {
            "package_id":$scope.formData.package_id,
            "name": $scope.formData.name,
            "start_time": $scope.formData.start_time,
            "end_time":$scope.formData.end_time

        };
      console.log(dataObj);
           PackageService.updateDeal(dataObj).then(
               function (payload) {
                   if(payload.status =='success') {
                       notiService.success(payload.message)
                         return  $location.path("home");
                   }
                   console.log(payload);
               }
           );
    };
})
// app.controller('categoryEditCtrl', function($scope,$routeParams,PackageService,$rootScope,notiService,$location) {
//     console.log($routeParams);
//     $rootScope.attachments = [];
//     $scope.formData = {};
//     if($routeParams != '') {
//         $scope.editButton = true;
//         PackageService.getCategoryById($routeParams).then(
//             function (payload) {
//                 $scope.isLoader = false;
//                 console.log(payload);
//                 if(payload.status == 'success') {
//                     $scope.formData.name = payload.data.name;
//                     $scope.formData.parent_name = payload.data.parent_name;
//                     $scope.formData.description = payload.data.description;
//                 }
//             }
//         );
//     }
   
//      $scope.updateCategory = function() {
//        $scope.isLoader = true; 
//        if($rootScope.listImages ==  undefined) {
//            notiService.error("Please enter all fields")
//        } else {
//           var dataObj = {
//             "name":$scope.formData.name,
//             "parent_name": $scope.formData.parent_name,
//             "descriptions": $scope.formData.description
//         };
//            console.log(dataObj);
//            PackageService.updateCategory(dataObj).then(
//                function (payload) {
//                    if(payload.status =='success') {
//                        notiService.success(payload.message)
//                        return  $location.path("home");
                       
//                    }
//                    console.log(payload);
//                }
//            );
//        }

//    };
// })
app.controller('create_package_Ctrl', function($scope,$routeParams,PackageService,$rootScope,notiService,ImageUpload,$location) {
    console.log($routeParams);
    $rootScope.attachments = [];
    $scope.formData = {};
    PackageService.getAllPackage().then(
           function (payload) {
              console.log(payload);
            if(payload.status == 'success') {
              $scope.allPackage = payload.data;
            }
           }
       );
   
   $rootScope.filenames = [];
    $scope.Attach = function() {
        $scope.isLoader = true;
        ImageUpload.open().then(
            function (payload) {
                $scope.isLoader = false;
                for (i = 0; i < payload.length; i++) {
                    $scope.showAttachments = true;
                    $rootScope.filenames.push(payload[i]);
                    $rootScope.attachments.push(payload[i].url);
                    console.log($rootScope.filenames);
                }
            }
        )
    };
    $scope.UploadImg = function() {
        $scope.isLoader = true;
        ImageUpload.open().then(
            function (payload) {
                console.log(payload)
                $scope.isLoader = false;
                $rootScope.listImages = payload[0].url;
                $rootScope.showUpload = true;
                console.log($rootScope.listImages)
            }
        )
    };
     $scope.createPackage = function() {
       $scope.isLoader = true; 
       if($rootScope.listImages ==  undefined) {
           notiService.error("Please enter all fields")
       } else {
           var dataObj = {
               "id":$routeParams.id,
               "images": $rootScope.listImages,
               "cover_image": $rootScope.attachments.toString(),
               "category_id":$scope.formData.category_id,
               "currency_id":$scope.formData.currency_id,
               "location_id":$scope.formData.location_id,
               "subcategory_id":$scope.formData.subcategory_id,
               "name": $scope.formData.name,
               "subtitle": $scope.formData.subtitle,
               "description": $scope.formData.description,
               "price": $scope.formData.price
           };
           console.log(dataObj);
           PackageService.createPackage(dataObj).then(
               function (payload) {
                   if(payload.status =='success') {
                       notiService.success(payload.message)
                       return  $location.path("home");
                       
                   }
                   console.log(payload);
               }
           );
       }

   };
})
app.controller('create_deal_Ctrl', function ($scope,$routeParams,$rootScope,notiService,PackageService,$location) {
    console.log("helo")
    $scope.formData = {};
    // $rootScope.attachments = [];
    PackageService.getAllDeal().then(
           function (payload) {
              console.log(payload);
            if(payload.status == 'success') {
              $scope.allDeal = payload.data;
            }
           }
       );
    
     $scope.createDeal = function() {
        $scope.isLoader = true;
        var dataObj = {
            "package_id":$scope.formData.package_id,
            "name": $scope.formData.name,
            "start_time": $scope.formData.start_time,
            "end_time":$scope.formData.end_time

        };
      console.log(dataObj);
           PackageService.createDeal(dataObj).then(
               function (payload) {
                   if(payload.status =='success') {
                       notiService.success(payload.message)
                         return  $location.path("home");
                   }
                   console.log(payload);
               }
           );
    };
})
app.controller('create_category_Ctrl', function($scope,$routeParams,PackageService,$rootScope,notiService,$location) {
    console.log($routeParams);
    $scope.formData = {};
    // $rootScope.attachments = [];
     $scope.createCategory = function() {
        $scope.isLoader = true;
        var dataObj = {
            "name":$scope.formData.name,
            "parent_name": $scope.formData.parent_name,
            "descriptions": $scope.formData.description
        };
      console.log(dataObj);
           PackageService.createCategory(dataObj).then(
               function (payload) {
                   if(payload.status =='success') {
                       notiService.success(payload.message)
                         return  $location.path("home");
                   }
                   console.log(payload);
               }
           );
    };
})

