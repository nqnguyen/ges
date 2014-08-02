// Some utility code in js by Chaim Gingold, 2013.
// For Sim & Games class CMPS179/Spring.

var CG =
{
	setTimerFreq : function( timer, msFreq, func )
	{
		// timer:	old timer (can be null)
		// msFreq:	frequency 1000ms in sec. <=0 for do nothing.
		// func:	func to call
		// returns:	new timer.
		
		// for ref
		// http://ejohn.org/blog/how-javascript-timers-work/
		// http://www.w3schools.com/js/js_timing.asp
		
		if ( timer )
		{
			clearInterval(timer) ;
			timer = null ;
		}
		
		if (msFreq>0)
		{
			timer = setInterval( func, msFreq ) ;	
		}
		
		return timer ; // return new timer
	}
	
	
	,lerp : function( frac, a, b )
	{
		return a + (b-a)*frac ;
	}

	,lerpColor : function( frac, a, b )
	{
		r = new paper.Color() ;
		
		r.red   = this.lerp(frac,a.red,  b.red) ;
		r.green = this.lerp(frac,a.green,b.green) ;
		r.blue  = this.lerp(frac,a.blue, b.blue) ;
		
		return r ;
	}

} ;