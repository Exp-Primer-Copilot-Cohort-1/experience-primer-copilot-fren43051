function skillsMembers() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/members/member.html',
        scope: {
        member: '='
        },
        controller: function($scope) {
        $scope.skills = $scope.member.skills;
        }
    };
}
