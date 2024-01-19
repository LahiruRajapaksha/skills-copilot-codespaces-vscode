function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'templates/skills-member.html',
        scope: {
            member: '=',
            skills: '='
        },
        controller: function ($scope) {
            $scope.getSkillName = function (skillId) {
                var skill = $scope.skills.filter(function (skill) {
                    return skill.id === skillId;
                })[0];
                return skill.name;
            };
        }
    };
}