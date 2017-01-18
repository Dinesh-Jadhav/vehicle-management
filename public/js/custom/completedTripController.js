var values ={};
   
customApp.controller('completedTripController',['$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder','$filter', function ($scope, $http,DTOptionsBuilder,DTColumnBuilder,$filter) {
		$scope.dtColumns = [
            //here We will add .withOption('name','column_name') for send column name to the server 
            DTColumnBuilder.newColumn("id", "Session Id").notSortable(),
            /*DTColumnBuilder.newColumn("new_user", "New User"),*/
            DTColumnBuilder.newColumn("requester_id", "User ID").notSortable(),
            DTColumnBuilder.newColumn("owner_id", "Vendor ID").notSortable(),
            DTColumnBuilder.newColumn("start_date", "Start Date").notSortable(),
            DTColumnBuilder.newColumn("trip_end_date", "End Date").notSortable(),
            DTColumnBuilder.newColumn("start_time", "Start Time").notSortable(),
            DTColumnBuilder.newColumn("end_time", "Stop Time").notSortable(),
            DTColumnBuilder.newColumn("total_time", "Total Time Clocked").notSortable(),
            DTColumnBuilder.newColumn("multiplier", "Multiplier").notSortable(),
            
            
            /*DTColumnBuilder.newColumn("amount", "Amount Deducted").notSortable()*/
        ]
 
        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
            contentType: "application/json;",
            url: "/completedTripList",
            type:"GET",
            dataSrc: function (res) { 
                    var log = []; 
                    var generateResponse = JSON.parse(res.success);
                    angular.forEach(generateResponse,function(item,index){
                        item.current_date = $filter('date')(new Date(), 'dd-MM-yyyy');
                        item.current_time = $filter('date')(new Date(), 'HH:mm:ss');
                        
                        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                        var firstDate = new Date(item.end_date);
                        var secondDate = new Date(item.start_date);
                        
                        var diff = firstDate.getTime() - secondDate.getTime();
                        var diffDays = Math.round(Math.abs((diff)/(oneDay)));
                        
                       
                        item.total_time = Math.round((diff/oneDay)*24);
                        item.date_diff = diffDays +' Days';

                        log.push(item);
                    });
                    return log;
            }
        })
        .withOption('processing', true) //for show progress bar
        .withOption('serverSide', true) // for server side processing
        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
        .withDisplayLength(10) // Page size
        .withOption('aaSorting',[0,'asc'])
}]);
   
customApp.controller('vendorCompleteSession',['$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder','$filter', function ($scope, $http,DTOptionsBuilder,DTColumnBuilder,$filter) {
		$scope.dtColumns = [
            //here We will add .withOption('name','column_name') for send column name to the server 
            DTColumnBuilder.newColumn("id", "Session Id").notSortable(),
            /*DTColumnBuilder.newColumn("new_user", "New User"),*/
            DTColumnBuilder.newColumn("requester_id", "User ID").notSortable(),
           // DTColumnBuilder.newColumn("owner_id", "Vendor ID").notSortable(),
            DTColumnBuilder.newColumn("start_date", "Start Date").notSortable(),
            DTColumnBuilder.newColumn("trip_end_date", "End Date").notSortable(),
            DTColumnBuilder.newColumn("start_time", "Start Time").notSortable(),
            DTColumnBuilder.newColumn("end_time", "Stop Time").notSortable(),
            DTColumnBuilder.newColumn("total_time", "Total Time Clocked").notSortable(),
            DTColumnBuilder.newColumn("multiplier", "Multiplier").notSortable(),
            DTColumnBuilder.newColumn("total_time_with_multiplier", "Total Time").notSortable(),
            
            
            /*DTColumnBuilder.newColumn("amount", "Amount Deducted").notSortable()*/
        ]
 
        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
            contentType: "application/json;",
            url: "/vendorcompleteTripList",
            type:"GET",
            dataSrc: function (res) { 
                
                    var log = []; 
                    var generateResponse = JSON.parse(res.success);
                    angular.forEach(generateResponse,function(item,index){
                        item.current_date = $filter('date')(new Date(), 'dd-MM-yyyy');
                        item.current_time = $filter('date')(new Date(), 'HH:mm:ss');
                        
                        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                        var ChangedDate = $filter('date')(item.end_date, 'dd MMM, yyyy');
                        var firstDate = new Date(ChangedDate+' '+item.end_time);
                        var secondDate = new Date(item.start_date+' '+item.start_time);

                        var milisecondsDiff = firstDate-secondDate;
                        var secondsDiff = milisecondsDiff/1000;
                        var minutesDiff = secondsDiff/60;
                        var hoursDiff = parseInt(minutesDiff/60);
                        var daysDiff = hoursDiff/24;

                        item.total_time = hoursDiff+':'+(minutesDiff%60)+':'+(secondsDiff%60);
                        
                        var milisecondsDiffWithMulti = (firstDate-secondDate)*item.multiplier;
                        var secondsDiffWithMulti = milisecondsDiffWithMulti/1000;
                        var minutesDiffWithMulti = secondsDiffWithMulti/60;
                        var hoursDiffWithMulti = parseInt(minutesDiffWithMulti/60);
                        var daysDiffWithMulti = hoursDiffWithMulti/24;
                        item.total_time_with_multiplier =hoursDiffWithMulti+':'+(minutesDiffWithMulti%60)+':'+(secondsDiffWithMulti%60);

                        log.push(item);
                    });
                    return log;
            }
        })
        .withOption('processing', true) //for show progress bar
        .withOption('serverSide', true) // for server side processing
        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
        .withDisplayLength(10) // Page size
        .withOption('aaSorting',[0,'asc'])
}]);

