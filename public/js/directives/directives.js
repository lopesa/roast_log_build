angular.module('RoastLogAppDirs', ['d3'])
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
})
// from http://www.ng-newsletter.com/posts/d3-on-angular.html
.directive('d3Bars', ['d3Service', '$window', function(d3Service, $window) {
  return {
    restrict: 'EA',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {
      d3Service.d3().then(function(d3) {
      // d3 is the raw d3 object

        // console.log("wtf");
        var margin = parseInt(attrs.margin) || 20,
          barHeight = parseInt(attrs.barHeight) || 20,
          barPadding = parseInt(attrs.barPadding) || 5;


        var svg = d3.select(element[0])
          .append("svg")
          .style('width', '100%');
          // console.log(angular.element($window)[0].innerWidth)

          
        // Browser onresize event
        //          
        // so am i undersanding right that this is the listener
        // for the window onresize event and
        // the function below watches scope
        $window.onresize = function() {
          scope.$apply();
        };

        
        // Watch for resize event
        scope.$watch(function() {
          return angular.element($window)[0].innerWidth;
        }, function() {
          scope.render(scope.data);
        });


         // hard-code data
        // scope.data = [
        //   {name: "Greg", score: 98},
        //   {name: "Ari", score: 96},
        //   {name: 'Q', score: 75},
        //   {name: "Loser", score: 48}
        // ];


        scope.render = function(data) {
          console.log(angular.element($window)[0].innerWidth)
          // our custom d3 code
          // remove all previous items before render
          svg.selectAll('*').remove();

          // If we don't pass any data, return out of the element
          if (!data) return;

          // setup variables
          var width = d3.select(element[0]).node().offsetWidth - margin,
              // calculate the height
              height = scope.data.length * (barHeight + barPadding),
              // Use the category20() scale function for multicolor support
              color = d3.scale.category20(),
              // our xScale
              xScale = d3.scale.linear()
                .domain([0, d3.max(data, function(d) {
                  return d.score;
                })])
                .range([0, width]);

          // set the height based on the calculations above
          svg.attr('height', height);

          //create the rectangles for the bar chart
          svg.selectAll('rect')
            .data(data).enter()
              .append('rect')
              .attr('height', barHeight)
              .attr('width', 140)
              .attr('x', Math.round(margin/2))
              .attr('y', function(d,i) {
                return i * (barHeight + barPadding);
              })
              .attr('fill', function(d) { return color(d.score); })
              .transition()
                .duration(1000)
                .attr('width', function(d) {
                  return xScale(d.score);
                });

              }


      });
    }
  }
}]);
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
