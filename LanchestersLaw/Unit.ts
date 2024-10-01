module LanchestersLaw {
    import V = Vector2D;

    export class Unit {
        private position: V.Vector2D = new V.Vector2D(0, 0);
        private party: PARTY = PARTY.NEUTRAL;
        private health: number = 1.0;
        private color: string = "#000000";
        private injury: number = 0;
        private power: number = 0.1;

        private posTargetX: number;
        private posTargetY: number;

        constructor(_party: PARTY, _position: V.Vector2D) {
            this.setParty(_party);
            this.setPosition(_position);
        }

        public static getColor(_party: PARTY, _health: number): string {
            var alpha: number = (_health > 0) ? 1.0 : 0.2;
            switch (_party) {
                case PARTY.RED: return "rgba(255,0,0," + alpha + ")";
                case PARTY.BLUE: return "rgba(128,128,255," + alpha + ")";
            }
            return "rgba(200,200,200," + alpha + ")";
        }

        public setParty(_party: PARTY): void {
            this.party = _party;
            this.color = Unit.getColor(_party, this.health);
        }

        public getParty(): PARTY {
            return this.party;
        }

        public setPosition(_position: V.Vector2D): void {
            this.position.setVector(_position);
        }

        public setHealth(_health: number): void {
            this.health = Math.max(0, Math.min(1.0, _health));
            this.color = Unit.getColor(this.party, this.health);
        }

        public getHealth(): number {
            return this.health;
        }

        public setPower(_power: number): void {
            this.power = _power;
        }

        public getPower(): number {
            return this.power;
        }

        public hit(_power: number): void {
            this.injury += _power;
        }

        public update(): void {
            this.setHealth(this.health - this.injury);
            this.injury = 0;
            if (this.getHealth() < 0.001)
                this.setHealth(0);
        }

        public findNearestUnit(_aUnits: Unit[], _party: PARTY): Unit {
            var maxDistance: number = Infinity;
            var closest: Unit = null;
            for (var i: number = 0; i < _aUnits.length; i++) {
                var test: Unit = _aUnits[i];
                if (test.health == 0 || test.party != _party || this == test)
                    continue;
                var d: number = this.position.getDistanceTo(test.position);
                if (d < maxDistance) {
                    closest = test;
                    maxDistance = d;
                }
            }
            return closest;
        }

        public displayLine(_to: Unit): void {
            crc2.beginPath();
            crc2.strokeStyle = this.color;
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(_to.position.x + Math.random() * 6 - 3, _to.position.y + Math.random() * 6 - 3);
            crc2.stroke();
        }

        /**
         * Display this object as a circle with its color and size
         */
        public display(): void {
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
        }

        /**
       * Returns true if the coordinates given are within the size of this object
       */
        public testHit(_hitX: number, _hitY: number): boolean {
            var dx: number = _hitX - this.position.x;
            var dy: number = _hitY - this.position.y;
            var distance: number = Math.sqrt(dx * dx + dy * dy);
            if (distance < 10) {
                return true;
            }
            return false;
        }
    }
}