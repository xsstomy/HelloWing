/**
 * Created by xiashishi on 15/3/17.
 */
 class HelloWing extends egret.gui.SkinnableComponent
{
    public constructor()
    {
        super();
        this.skinName = content.HelloWingSkin;
    }

    public startButton:egret.gui.Button;
    public partAdded(name:string,instance:any)
    {
        super.partAdded(name,instance);
        if(instance == this.startButton)
        {
            egret.Tween.get( this.startButton ).to({y:0}, 1000 ,egret.Ease.backInOut);
        }
    }
}