angular.module('RoastLogAppDirs', [])
	.directive('fileInput',['$parse',function($parse){
    	return {
    		restrict:'A',
    		link:function(scope,elm,attrs){
    			//console.log('now?');
    			elm.bind('change',function(){
    				$parse(attrs.fileInput)
    				.assign(scope,elm[0].files)
    				scope.$apply()
    			})
    		}
    	}
    }]);