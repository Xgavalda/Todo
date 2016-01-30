var todo = angular.module('todo', []);

todo.filter('timeago', function(){
	return function(date){
		return moment(date).fromNow();
	}
});

function mainController($scope, $http) {

	$scope.formData = {};

	$scope.initialize = function() 
	{
		$http.get('/api/todos')
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		$http.get('/api/todosCat')
			.success(function(data) {
				$scope.totesAllCategoria = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.createTodo = function() {

		console.log($scope.formData);

		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$('input').val('');
				$scope.todos = data;
				console.log('Creating todo [' + data.text + ']');
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.createCategories = function() {

		console.log($scope.formData);

		$http.post('/api/todosCat', $scope.formData)
			.success(function(data) {
				$('input').val('');
				$scope.totesAllCategoria = data;
				console.log('Creating todoCategoria [' + data.text + ']');
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// $scope.deleteTodo = function(todoId) {
	// 	$http.delete('/api/todosCat' + todoId)
	// 		.success(function(data) {
	// 			$scope.todos = data;
	// 			console.log(data);
	// 		}).error(function(data) {
	// 			console.log('Error: ' + data)
	// 		})
	// };

}