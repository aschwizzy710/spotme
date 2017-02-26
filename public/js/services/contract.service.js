(function() {
  angular.module('SpotMe')
        .factory('ContractService', ContractService);

  ContractService.$inject = ['$http'];

  function ContractService($http){
    init();
    var contracts = [];
    return {
      get: getAllContracts,
      create: createOneContract,
      update: updateOneContract,
      delete: deleteOneContract
    };

    function init(){ // this is going to make our first data request upon file load
      $http.get('/contracts')
            .then(function(response){
              contracts = response.data.contracts;
            })
            .catch(function(err){
              console.log(err);
            });
    }
    function getAllContracts(){
      return contracts;
    }
    function createOneContract(contract){
      $http.post('/contracts', contract)
          .then(function(response){
            contracts.push(contract);
          })
          .catch(function(err){
            console.log(err);
          });
    }
    function updateOneContract(index, updatedContract){
      $http.put('/contracts/' + updatedContract._id, updatedContract)
          .then(function(response){
            contracts.splice(index, 1, updatedContract);
          })
          .catch(function(err){
            console.log(err);
          });
    }
    function deleteOneContract(index, deletedContract){
      $http.delete('/contracts/' + deletedContract._id)
          .then(function(){
            contracts.splice(index, 1);
          })
          .catch(function(){
            console.log(err);
          });
    }

  }
}());
