/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//xDelta, yDelta: how large a shake
//shakeFrequency: how much movement
//shakeDuration: for how long in number of cycles
function ShakePosition(xDelta, yDelta, shakeFrequency, shakeDuration) {
    this.mXMag = xDelta;
    this.mYMag = yDelta;
    this.mCycles = shakeDuration; //number of cycles to complete transaction
    this.mOmega = shakeFrequency * 2 * Math.PI; //Converts frequency to radians
    this.mNumCyclesLeft = shakeDuration;
}

ShakePosition.prototype._nextDampedHarmonic = function() {
    // computes (Cycles) * cos( Omega * t )
    var frac = this.mNumCyclesLeft / this.mCycles;
    return frac * frac * Math.cos((1 - frac) * this.mOmega);
};

ShakePosition.prototype.shakeDone = function() {
    return (this.mNumCyclesLeft <= 0);
};

ShakePosition.prototype.getShakeResults = function() {
    this.mNumCyclesLeft--;
    var c = [];
    var fx = 0;
    var fy = 0;
    if(!this.shakeDone()) {
        var v = this._nextDampedHarmonic();
        fx = (Math.random() > 0.5) ? -v : v;
        fy = (Math.random() > 0.5) ? -v : v;
    }
    c[0] = this.mXMag * fx;
    c[1] = this.mYMag * fy;
    return c;
};