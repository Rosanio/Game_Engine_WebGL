/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Transform() {
    this.mPosition = vec2.fromValues(0,0);  //translation operator
    this.mScale = vec2.fromValues(1,1);     //scaling operator
    this.mZ = 0.0;                          //must be a positive number, larger is closer to eye
    this.mRotationInRad = 0.0;              //rotation in radians
}

//Position getters and setters
Transform.prototype.setPosition = function(xPos, yPos) {
    this.setXPos(xPos);
    this.setYPos(yPos);
};
Transform.prototype.getPosition = function() {
    return this.mPosition;
};
Transform.prototype.get3DPosition = function() {
    return vec3.fromValues(this.getXPos(), this.getYPos(), this.getZPos());
};
Transform.prototype.getXPos = function() {
    return this.mPosition[0];
};
Transform.prototype.setXPos = function(xPos) {
    this.mPosition[0] = xPos;
};
Transform.prototype.incXPosBy = function(delta) {
    this.mPosition[0] += delta;
};
Transform.prototype.getYPos = function() {
    return this.mPosition[1];
};
Transform.prototype.setYPos = function(yPos) {
    this.mPosition[1] = yPos;
};
Transform.prototype.incYPosBy = function(delta) {
    this.mPosition[1] += delta;
};
Transform.prototype.setZPos = function(zPos) {
    this.mZ = zPos;
};
Transform.prototype.getZPos = function() {
    return this.mZ;
};
Transform.prototype.incZPosBy = function(delta) {
    this.mZ += delta;
};

//Size getters and setters
Transform.prototype.setSize = function(width, height) {
    this.setWidth(width);
    this.setHeight(height);
};
Transform.prototype.getSize = function() {
    return this.mScale;
};
Transform.prototype.incSizeBy = function(delta) {
    this.incWidthBy(delta);
    this.incHeightBy(delta);
};
Transform.prototype.getWidth = function() {
    return this.mScale[0];
};
Transform.prototype.setWidth = function(width) {
    this.mScale[0] = width;
};
Transform.prototype.incWidthBy = function(delta) {
    this.mScale[0] += delta;
};
Transform.prototype.getHeight = function() {
    return this.mScale[1];
};
Transform.prototype.setHeight = function(height) {
    this.mScale[1] = height;
};
Transform.prototype.incHeightBy = function(delta) {
    this.mScale[1] += delta;
};

//Rotation getters and setters
Transform.prototype.setRotationInRad = function(rotationInRadians) {
    this.mRotationInRad = rotationInRadians;
    while(this.mRotationInRad > (2*Math.PI))
        this.mRotationInRad -= (2*Math.PI);
};
Transform.prototype.setRotationInDegree = function(rotationInDegree) {
    this.setRotationInRad(rotationInDegree * Math.PI/180.0);
};
Transform.prototype.incRotationByRad = function(deltaRad) {
    this.setRotationInRad(this.mRotationInRad + deltaRad);
};
Transform.prototype.incRotationByDegree = function(deltaDegree) {
    this.incRotationByRad(deltaDegree * Math.PI/180.0);
};
Transform.prototype.getRotationInRad = function() {
    return this.mRotationInRad;
};
Transform.prototype.getRotationInDegree = function() {
    return this.mRotationInRad * Math.PI/180.0;
};

Transform.prototype.getXform = function() {
    //Creates a blank identity matrix
    var matrix = mat4.create();
    
    //Compute translation, for now z is always at 0.0
    mat4.translate(matrix, matrix, this.get3DPosition());
    //Concatenate with rotation
    mat4.rotateZ(matrix, matrix, this.getRotationInRad());
    //Contatenate with scaling
    mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
    return matrix;
};

Transform.prototype.cloneTo = function(aXform) {
    aXform.mPosition = vec2.clone(this.mPosition);
    aXform.mScale = vec2.clone(this.mScale);
    aXform.mZ = this.mZ;
    aXform.mRotationInRad = this.mRotationInRad;
};

