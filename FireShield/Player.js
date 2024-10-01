var FireShield;
(function (FireShield) {
    var Player = (function () {
        function Player(_posX, _posY) {
            this.fSize = 10;
            this.iFire = 0;
            this.iShield = 0;
            this.bLock = false;
            this.setPosition(_posX, _posY);
        }
        Player.prototype.setPosition = function (_posX, _posY) {
            this.posX = _posX;
            this.posY = _posY;
        };
        Player.prototype.setSize = function (_size) {
            this.fSize = _size;
        };
        Player.prototype.setColor = function (_color) {
            this.color = _color;
        };
        Player.prototype.setFireAndShield = function (_playerFire, _playerShield) {
            this.playerFire = _playerFire;
            this.playerShield = _playerShield;
            this.playerFire.iFire++;
            this.playerShield.iShield++;
        };
        /**
         * randomly select two Player-Objects from the given array,
         * make sure they're not the same or this and
         * store them as fire and shield for this
         */
        Player.prototype.findFireAndShield = function (_aPlayers) {
            var nPlayers = _aPlayers.length;
            var fire;
            var shield;
            do {
                var r = Math.floor(Math.random() * nPlayers);
                fire = _aPlayers[r];
            } while (fire == this);
            do {
                var r = Math.floor(Math.random() * nPlayers);
                shield = _aPlayers[r];
            } while (shield == this || shield == fire);
            this.setFireAndShield(fire, shield);
        };
        /**
         * Adjust color and size of this according to the relevance
         * as fire and shield for other objects.
         */
        Player.prototype.calculateColorAndSize = function (_fSize, _fColor) {
            if (_fColor === void 0) { _fColor = 30; }
            this.setSize(_fSize + (this.iFire + this.iShield));
            var iGreen = this.iFire * _fColor + this.iShield * _fColor;
            var iBlue = this.iShield * 2 * _fColor - this.iFire * _fColor;
            var iRed = this.iFire * 2 * _fColor - this.iShield * _fColor;
            var color = "rgb(" + iRed + "," + iGreen + "," + iBlue + ")";
            this.setColor(color);
        };
        /**
         * Calculate the position the object is striving to get to, which is
         * 20 px behind it's shield in line with the fire
         */
        Player.prototype.calculateTargetPosition = function () {
            var posTargetX = this.playerShield.posX - this.playerFire.posX;
            var posTargetY = this.playerShield.posY - this.playerFire.posY;
            var l = Math.sqrt(posTargetX * posTargetX + posTargetY * posTargetY);
            if (l > 0) {
                posTargetX = this.playerShield.posX + 20 * posTargetX / l;
                posTargetY = this.playerShield.posY + 20 * posTargetY / l;
                this.setTargetPos(posTargetX, posTargetY);
            }
        };
        Player.prototype.setTargetPos = function (_posX, _posY) {
            this.posTargetX = _posX;
            this.posTargetY = _posY;
        };
        /**
         * Returns true if the coordinates given are within the size of this object
         */
        Player.prototype.testHit = function (_hitX, _hitY) {
            var dx = _hitX - this.posX;
            var dy = _hitY - this.posY;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.fSize) {
                return true;
            }
            return false;
        };
        Player.prototype.toggleLock = function () {
            this.bLock = !this.bLock;
        };
        /**
         * Moves the object a bit toward the target position using easing
         */
        Player.prototype.move = function () {
            if (this.bLock)
                return;
            this.posX += 0.05 * (this.posTargetX - this.posX);
            this.posY += 0.05 * (this.posTargetY - this.posY);
            this.posX = Math.min(crc2.canvas.width, Math.max(0, this.posX));
            this.posY = Math.min(crc2.canvas.height, Math.max(0, this.posY));
        };
        /**
         * Draw a line on the canvas from this object to its shield
         */
        Player.prototype.displayLine = function () {
            crc2.moveTo(this.posX, this.posY);
            crc2.lineTo(this.playerShield.posX, this.playerShield.posY);
        };
        /**
         * Display this object as a circle with its color and size
         */
        Player.prototype.display = function () {
            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.arc(this.posX, this.posY, this.fSize, 0, 2 * Math.PI);
            crc2.fill();
            crc2.closePath();
            crc2.stroke();
        };
        return Player;
    })();
    FireShield.Player = Player;
})(FireShield || (FireShield = {}));
//# sourceMappingURL=Player.js.map