angular.module('RoastLogAppDirs', [])
	// .directive('fileInput',['$parse',function($parse){
 //    	return {
 //    		restrict:'A',
 //    		link:function(scope,elm,attrs){
 //    			//console.log('now?');
 //    			elm.bind('change',function(){
 //    				$parse(attrs.fileInput)
 //    				.assign(scope,elm[0].files)
 //    				scope.$apply()
 //    			})
 //    		}
 //    	}
 //    }])
    .directive('rstImageZoom', function() {
        function link(scope, element) {
            element.on('click', function() {
                $('body').prepend('<div style="font-size:3em;position:absolute;z-index:5;height:100%;left:50%;">appended</p>');
                // console.log('clicked in directive');
            });
        }
        return {
            link: link
        };
    });
    // .directive('rstImageZoom', function() {
    //     return {
    //         templateUrl: 'image-popup.tpl.html',
    //         link: function link(scope, element) {
    //             element.on('click', function() {
    //                 // $('body').prepend('<div style="font-size:3em;position:absolute;z-index:5;height:100%;left:50%;">appended</p>');
    //                 console.log('clicked in directive');
    //             });
    //         },
            
    //     };
    // }); 
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
    }])
    .directive('modalDialog', function() {
      return {
        restrict: 'E',
        scope: {
          show: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {
          scope.dialogStyle = {};
          if (attrs.width)
            scope.dialogStyle.width = attrs.width;
          if (attrs.height)
            scope.dialogStyle.height = attrs.height;
          scope.hideModal = function() {
            scope.show = false;
          };
        },
        templateUrl: "templates/modal.html"
      };
    });
    // .directive('modal', function() {
    //     function link(scope, element, attrs) {
    //         element.on('click', function() {

    //             // console.log('fuck oy');
    //         })
    //     }


    //     return {
    //         link: link
    //         templateUrl: 'modal.html'
    //     }
    // });
>>>>>>> 920752538cec0b92a0f2b056589db6870f13333a
