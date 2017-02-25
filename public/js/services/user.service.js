(function() {
  angular.module('SpotMe')
        .factory('UserService', UserService);

  UserService.$inject = ['$http'];

  function UserService($http){
    init();
    var users = [];
    return {
      get: getAllUsers,
      create: createOneUser,
      update: updateOneUser,
      delete: deleteOneUser
    };

    function init(){ // this is going to make our first data request upon file load
      $http.get('/users')
            .then(function(response){
              users = response.data.users;
            })
            .catch(function(err){
              console.log(err);
            });
    }
    function getAllUsers(){
      return users;
    }
    function createOneUser(user){
      $http.post('/users', user)
          .then(function(response){
            users.push(user);
          })
          .catch(function(err){
            console.log(err);
          });
    }
    function updateOneUser(index, updatedUser){
      $http.put('/users/' + updatedUser._id, updatedUser)
          .then(function(response){
            users.splice(index, 1, updatedUser);
          })
          .catch(function(err){
            console.log(err);
          });
    }
    function deleteOneUser(index, deletedUser){
      $http.delete('/users/' + deletedUser._id)
          .then(function(){
            users.splice(index, 1);
          })
          .catch(function(){
            console.log(err);
          });
    }

  }
}());
