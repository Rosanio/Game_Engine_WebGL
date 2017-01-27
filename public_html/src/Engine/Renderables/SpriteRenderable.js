/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function SpriteRenderable(myTexture) {
    TextureRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getSpriteShader());
    
    this.mTexLeft = 0.0;
    this.mTexRight = 1.0;
    this.mTexTop = 1.0;
    this.mTexBottom = 0.0;
    this._setTexInfo();
}
gEngine.Core.inheritPrototype(SpriteRenderable, TextureRenderable);

//The expected texture coordinate array is an array of 8 floats where:
// [0] [1]: is u/v coordinate of Top-Right
// [2] [3]: is u/v coordinate of Top-Left
// [4] [5]: is u/v coordinate of Bottom-Right
// [6] [7]: is u/v coordinate of Bottom-Left
SpriteRenderable.eTexCoordArray = Object.freeze({
    eLeft: 2,
    eRight: 0,
    eTop: 1,
    eBottom: 5
});

SpriteRenderable.prototype.setElementUVCoordinate = function(left, right, bottom, top) {
    this.mTexLeft = left;
    this.mTexRight = right;
    this.mTexTop = top;
    this.mTexBottom = bottom;
    this._setTexInfo();
};

SpriteRenderable.prototype.setElementPixelPositions = function(left, right, bottom, top) {
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.mTexture);
    
    //entire image width, height
    var imageW = texInfo.mWidth;
    var imageH = texInfo.mHeight;
    
    this.mTexLeft = left / imageW;
    this.mTexRight = right / imageW;
    this.mTexBottom = bottom / imageH;
    this.mTexTop = top / imageH;
    this._setTexInfo();
};

SpriteRenderable.prototype.getElementUVCoordinateArray = function() {
    return [
        this.mTexRight, this.mTexTop,
        this.mTexLeft, this.mTexTop,
        this.mTexRight, this.mTexBottom,
        this.mTexLeft, this.mTexBottom
    ];
};

SpriteRenderable.prototype.draw = function(pixelColor, aCamera) {
    //set the current texture coordinate
    this.mShader.setTextureCoordinate(this.getElementUVCoordinateArray());
    TextureRenderable.prototype.draw.call(this, pixelColor, aCamera);
};