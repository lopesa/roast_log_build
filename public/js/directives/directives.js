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
    // .directive('rstImageZoom', function() {
    //     function link(scope, element) {
    //         element.on('click', function() {
    //             $('body').prepend('<div style="font-size:3em;position:absolute;z-index:5;height:100%;left:50%;">appended</p>');
    //             // console.log('clicked in directive');
    //         });
    //     }
    //     return {
    //         link: link
    //     };
    // });
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
    //
    // orig from egghead: https://egghead.io/lessons/angularjs-file-uploads
    // 
	// .directive('fileInput',['$parse',function($parse){
 //    	return {
 //    		restrict:'A',
 //    		link:function(scope,elm,attrs){
 //    			//console.log('now?');
 //    			elm.bind('change',function(){
 //    				$parse(attrs.fileInput)
 //    				.assign(scope,elm[0].files)
 //    				scope.$apply()
 //                    console.log(scope)
 //    			})
 //    		}
 //    	}
 //    }])
    // tweaked for single file upload
     .directive('fileInput',['$parse',function($parse){
     return {
         restrict:'A',
         link:function(scope,elm,attrs){
             //console.log('now?');
             elm.bind('change',function(){
                 $parse(attrs.fileInput)
                 .assign(scope,elm[0].files[0])
                 scope.$apply()
                 // console.log(scope)
                 scope.getSignedRequest(elm[0].files[0])
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
