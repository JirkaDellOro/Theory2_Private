module FireShield {
    export class Player {

        private posTargetX: number;
        private posTargetY: number;
        private fSize: number = 10;
        private playerFire: Player;
        private playerShield: Player;
        private color: string;
        private iFire: number = 0;
        private iShield: number = 0;

        public posX: number;
        public posY: number;
        public bLock: boolean = false;

        constructor(_posX: number, _posY: number) {
            this.setPosition(_posX, _posY);
        }

        public setPosition(_posX: number, _posY: number): void {
            this.posX = _posX;
            this.posY = _posY;
        }

        public setSize(_size: number): void {
            this.fSize = _size;
        }

        public setColor(_color: string): void {
            this.color = _color;
        }

        private setFireAndShield(_playerFire: Player, _playerShield: Player): void {
            this.playerFire = _playerFire;
            this.playerShield = _playerShield;
            this.playerFire.iFire++;
            this.playerShield.iShield++;
        }

        /** 
         * randomly select two Player-Objects from the given array,
         * make sure they're not the same or this and
         * store them as fire and shield for this
         */
        public findFireAndShield(_aPlayers: Player[]): void {
            var nPlayers: number = _aPlayers.length;
            var fire: Player;
            var shield: Player;
            do {
                var r: number = Math.floor(Math.random() * nPlayers);
                fire = _aPlayers[r];
            } while (fire == this);

            do {
                var r: number = Math.floor(Math.random() * nPlayers);
                shield = _aPlayers[r];
            } while (shield == this || shield == fire);

            this.setFireAndShield(fire, shield);
        }

        /**
         * Adjust color and size of this according to the relevance
         * as fire and shield for other objects.
         */
        public calculateColorAndSize(_fSize: number, _fColor: number = 30): void {
            this.setSize(_fSize + (this.iFire + this.iShield));
            var iGreen: number = this.iFire * _fColor + this.iShield * _fColor;
            var iBlue: number = this.iShield * 2 * _fColor - this.iFire * _fColor;
            var iRed: number = this.iFire * 2 * _fColor - this.iShield * _fColor;
            var color: string = "rgb(" + iRed + "," + iGreen + "," + iBlue + ")";
            this.setColor(color);
        }

        /**
         * Calculate the position the object is striving to get to, which is 
         * 20 px behind it's shield in line with the fire
         */
        public calculateTargetPosition(): void {
            var posTargetX: number = this.playerShield.posX - this.playerFire.posX;
            var posTargetY: number = this.playerShield.posY - this.playerFire.posY;
            var l: number = Math.sqrt(posTargetX * posTargetX + posTargetY * posTargetY);
            if (l > 0) {
                posTargetX = this.playerShield.posX + 20 * posTargetX / l;
                posTargetY = this.playerShield.posY + 20 * posTargetY / l;
                this.setTargetPos(posTargetX, posTargetY);
            }
        }

        public setTargetPos(_posX: number, _posY: number): void {
            this.posTargetX = _posX;
            this.posTargetY = _posY;
        }
        
        /**
         * Returns true if the coordinates given are within the size of this object
         */
        public testHit(_hitX: number, _hitY: number): boolean {
            var dx: number = _hitX - this.posX;
            var dy: number = _hitY - this.posY;
            var distance: number = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.fSize) {
                return true;
            }
            return false;
        }

        public toggleLock(): void {
            this.bLock = !this.bLock;
        }

        /**
         * Moves the object a bit toward the target position using easing
         */
        public move(): void {
            if (this.bLock) return;
            this.posX += 0.05 * (this.posTargetX - this.posX);
            this.posY += 0.05 * (this.posTargetY - this.posY);
            this.posX = Math.min(crc2.canvas.width, Math.max(0, this.posX));
            this.posY = Math.min(crc2.canvas.height, Math.max(0, this.posY));
        }

        /**
         * Draw a line on the canvas from this object to its shield
         */
        public displayLine(): void {
            crc2.moveTo(this.posX, this.posY);
            crc2.lineTo(this.playerShield.posX, this.playerShield.posY);
        }

        /**
         * Display this object as a circle with its color and size
         */
        public display(): void {
            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.arc(this.posX, this.posY, this.fSize, 0, 2 * Math.PI);
            crc2.fill();
            crc2.closePath();
            crc2.stroke();
        }
    }
}