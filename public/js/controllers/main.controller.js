(function() {
  angular.module('SpotMe') // getter syntax
        .controller('MainController', MainController);

MainController.$inject = ['$scope', 'UserService'];

function MainController($scope, UserService){
  $scope.users = UserService.get();
  $scope.createUser = createUser;
  $scope.deleteUser = deleteUser;
  $scope.editUser = editUser;
  $scope.saveUser = saveUser;

  $scope.$watch(function(){
    return UserService.get();
  }, function(){
    $scope.users = UserService.get();
  });
  function createUser(newUser){
    UserService.create(newUser);
    $scope.newUser = '';
  }
  function deleteUser(index, user){
    UserService.delete(index, user);
  }
  function editUser(user){
    user.isBeingEdited = true;
  }
  function saveUser(index, user){
  UserService.update(index, user);
    user.isBeingEdited = false;
  }

}

AOS.init();
$(window).on('load', function () {
    AOS.refresh();
});

$(function () {
    $('#datetimepicker11').datetimepicker({
        daysOfWeekDisabled: [0, 6]
    });
});


}());
