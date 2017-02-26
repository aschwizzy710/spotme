(function() {
  angular.module('SpotMe') // getter syntax
        .controller('MainController', MainController);

MainController.$inject = ['$scope', 'ContractService'];

function MainController($scope, ContractService){
  $scope.contracts = ContractService.get();
  $scope.createContract = createContract;
  $scope.deleteContract = deleteContract;
  $scope.editContract = editContract;
  $scope.saveContract = saveContract;

  $scope.$watch(function(){
    return ContractService.get();
  }, function(){
    $scope.contracts = ContractService.get();
  });
  function createContract(contract){
    ContractService.create(contract);
  }
  function deleteContract(index, contract){
    ContractService.delete(index, contract);
  }
  function editContract(contract){
    contract.isBeingEdited = true;
  }
  function saveContract(index, contract){
  ContractService.update(index, contract);
    contract.isBeingEdited = false;
  }

}
//
// AOS.init();
// $(window).on('load', function () {
//     AOS.refresh();
// });

// $(function () {
//     $('#calendarIcon').datetimepicker({
//         daysOfWeekDisabled: [0, 6]
//     });
// });


}());
