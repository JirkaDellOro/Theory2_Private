var LanchestersLaw;
(function (LanchestersLaw) {
    var V = Vector2D;
    var Unit = (function () {
        function Unit(_party, _position) {
            this.position = new V.Vector2D(0, 0);
            this.party = LanchestersLaw.PARTY.NEUTRAL;
            this.health = 1.0;
            this.color = "#000000";
            this.injury = 0;
            this.power = 0.1;
            this.setParty(_party);
            this.setPosition(_position);
        }
        Unit.getColor = function (_party, _health) {
            var alpha = (_health > 0) ? 1.0 : 0.2;
            switch (_party) {
                case LanchestersLaw.PARTY.RED: return "rgba(255,0,0," + alpha + ")";
                case LanchestersLaw.PARTY.BLUE: return "rgba(128,128,255," + alpha + ")";
            }
            return "rgba(200,200,200," + alpha + ")";
        };
        Unit.prototype.setParty = function (_party) {
            this.party = _party;
            this.color = Unit.getColor(_party, this.health);
        };
        Unit.prototype.getParty = function () {
            return this.party;
        };
        Unit.prototype.setPosition = function (_position) {
            this.position.setVector(_position);
        };
        Unit.prototype.setHealth = function (_health) {
            this.health = Math.max(0, Math.min(1.0, _health));
            this.color = Unit.getColor(this.party, this.health);
        };
        Unit.prototype.getHealth = function () {
            return this.health;
        };
        Unit.prototype.setPower = function (_power) {
            this.power = _power;
        };
        Unit.prototype.getPower = function () {
            return this.power;
        };
        Unit.prototype.hit = function (_power) {
            this.injury += _power;
        };
        Unit.prototype.update = function () {
            this.setHealth(this.health - this.injury);
            this.injury = 0;
            if (this.getHealth() < 0.001)
                this.setHealth(0);
        };
        Unit.prototype.findNearestUnit = function (_aUnits, _party) {
            var maxDistance = Infinity;
            var closest = null;
            for (var i = 0; i < _aUnits.length; i++) {
                var test = _aUnits[i];
                if (test.health == 0 || test.party != _party || this == test)
                    continue;
                var d = this.position.getDistanceTo(test.position);
                if (d < maxDistance) {
                    closest = test;
                    maxDistance = d;
                }
            }
            return closest;
        };
        Unit.prototype.displayLine = function (_to) {
            crc2.beginPath();
            crc2.strokeStyle = this.color;
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(_to.position.x + Math.random() * 6 - 3, _to.position.y + Math.random() * 6 - 3);
            crc2.stroke();
        };
        /**
         * Display this object as a circle with its color and size
         */
        Unit.prototype.display = function () {
            //painter.save();
            // draw unit background
            crc2.beginPath();
            crc2.strokeStyle = "#000000";
            crc2.fillStyle = this.color;
            crc2.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
            //painter.closePath();
            crc2.fill();
            crc2.stroke();
            // draw healthmeter
            if (this.health > 0) {
                crc2.beginPath();
                crc2.lineWidth = 7;
                crc2.strokeStyle = "#00ff00";
                crc2.arc(this.position.x, this.position.y, 4, 0, this.health * 2 * Math.PI);
                //painter.fillStyle = "#00ff00";
                //painter.arc(this.position.x, this.position.y, 7, 0, this.health * 2 * Math.PI);
                //painter.fill();
                //painter.closePath();
                crc2.stroke();
            }
            //painter.restore();
            crc2.lineWidth = 1;
        };
        /**
       * Returns true if the coordinates given are within the size of this object
       */
        Unit.prototype.testHit = function (_hitX, _hitY) {
            var dx = _hitX - this.position.x;
            var dy = _hitY - this.position.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 10) {
                return true;
            }
            return false;
        };
        return Unit;
    })();
    LanchestersLaw.Unit = Unit;
})(LanchestersLaw || (LanchestersLaw = {}));
//# sourceMappingURL=Unit.js.map