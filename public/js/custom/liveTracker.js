	customApp.controller('liveTracker', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {
	    $scope.$emit('LOAD');
	    var markers = [{
	        "title": 'Oman',
	        "lat": '21.4735',
	        "lng": '55.9754',
	        "description": 'Oman is an Arab country on the southeastern coast of the Arabian Peninsula.'
	    }, {
	        "title": 'Muscat',
	        "lat": '23.5859',
	        "lng": '58.4059',
	        "description": 'Capital of Oman.'
	    }, {
	        "title": 'Bahla Fort',
	        "lat": '22.96455',
	        "lng": '57.3007',
	        "description": 'Bahla Fort is one of four historic fortresses situated at the foot of the Djebel Akhdar highlands in Oman.'
	    }];
	    $timeout(function() {
	        LoadMap();

	    }, 500);

	    /* 
	        	    $scope.GetLocation = function() {
	        	        /*$scope.$emit('LOAD');
	        	        var geocoder = new google.maps.Geocoder();
	        	        var address = $scope.society.address;
	        	        geocoder.geocode({ 'address': address }, function(results, status) {
	        	            if (status == google.maps.GeocoderStatus.OK) {
	        	                var latitude = results[0].geometry.location.lat();
	        	                var longitude = results[0].geometry.location.lng();

	        	                SetMarker(latitude, longitude, address);
	        	            } else {
	        	                alert('Sorry ! address not found on map, try again !')
	        	            }
	        	            $scope.$emit('UNLOAD');

	        	        });
	        	    }

	        	    function SetMarker(latitude, longitude, title) {


	        	        var myLatlng = new google.maps.LatLng(latitude, longitude);

	        	        var mapOptions = {
	        	            center: myLatlng,
	        	            zoom: 15,
	        	            mapTypeId: google.maps.MapTypeId.ROADMAP
	        	        };

	        	        map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

	        	        marker = new google.maps.Marker({
	        	            position: myLatlng,
	        	            map: map,
	        	            title: title
	        	        });

	        	        google.maps.event.addListener(map, 'click', function(event) {

	        	            $scope.society.latitude = event.latLng.lat();
	        	            $scope.society.longitude = event.latLng.lng();
	        	            var myLatlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());

	        	            var mapOptions = {
	        	                center: myLatlng,
	        	                zoom: 15,
	        	                mapTypeId: google.maps.MapTypeId.ROADMAP
	        	            };

	        	            map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

	        	            marker = new google.maps.Marker({
	        	                position: myLatlng,
	        	                map: map,
	        	                title: title
	        	            });
	        	        });
	        	    }*/

	    /* window.onload = function() {
	        LoadMap();
	    }
*/
	    function LoadMap() {
	        var mapOptions = {
	            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
	            zoom: 7,
	            mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
	        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

	        //Create and open InfoWindow.
	        var infoWindow = new google.maps.InfoWindow();

	        for (var i = 0; i < markers.length; i++) {
	            var data = markers[i];
	            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
	            var marker = new google.maps.Marker({
	                position: myLatlng,
	                map: map,
	                title: data.title
	            });

	            //Attach click event to the marker.
	            (function(marker, data) {
	                google.maps.event.addListener(marker, "click", function(e) {
	                    //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
	                    infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
	                    infoWindow.open(map, marker);
	                });
	            })(marker, data);
	        }
	    }
	}]);
