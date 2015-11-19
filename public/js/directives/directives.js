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