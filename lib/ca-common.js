// Common CA utility code in js by Chaim Gingold, 2013.
// For Sim & Games class CMPS179/Spring.

var CA =
{
	
	// dx,dy Adjacency offsets for...
	
	  // 4-way neighborhood
      //  +
      // + +
      //  +
	dx4 : [ -1,  0,  0,  1 ],
	dy4 : [  0, -1,  1,  0 ],

	  // 8-way neighborhood
      // +++
      // + +
      // +++
	dx8 : [ -1, -1, -1,  0,  0,  1,  1,  1 ],
	dy8 : [ -1,  0,  1, -1,  1, -1,  0,  1 ],
	
	new2dArray : function( x, y )
	{
		// a[x][y] to index -- not C style.
		var a = new Array(x) ;
		for( var i=0; i<x; ++i )
		{
			a[i] = new Array(y) ;
		}
		
		return a ;
	},

	forEach2d : function(nx,ny,f)
	{
		for( var y=0; y<ny; ++y )
		for( var x=0; x<nx; ++x )
		{
			f( x, y ) ;
		}
	},

	_forEachAdj : function(x,y,nx,ny,dx,dy,f)
	{
		var ix, iy ;
		
		for( var i=0; i<dx.length; ++i )
		{
			ix = x + dx[i] ;
			iy = y + dy[i] ;
			
			if ( this.isInBounds(ix,iy,nx,ny) )
			{
				f( ix, iy ) ;
			}
		}
	},

	forEachAdj4 : function(x,y,nx,ny,f)
	{
		this._forEachAdj(x,y,nx,ny,this.dx4,this.dy4,f) ;
	},

	forEachAdj8 : function(x,y,nx,ny,f)
	{
		this._forEachAdj(x,y,nx,ny,this.dx8,this.dy8,f) ;
	},


	_doRandAdj : function(x,y,nx,ny,dx,dy,f)
	{
		var n = Math.floor(Math.random()*1000) % (dx.length) ;
		
		var ix = x + dx[n] ;
		var iy = y + dy[n] ;
		
		if ( this.isInBounds(ix,iy,nx,ny) ) f(ix,iy) ;		
	},
	
	doRandAdj4 : function(x,y,nx,ny,f)
	{
		this._doRandAdj(x,y,nx,ny,this.dx4,this.dy4,f) ;
	},

	doRandAdj8 : function(x,y,nx,ny,f)
	{
		this._doRandAdj(x,y,nx,ny,this.dx8,this.dy8,f) ;
	},

	doRandCell : function(nx,ny,f)
	{
		var i = this.random2dIndex(nx,ny) ;
		
		f(i.x,i.y) ;
	},
	
	isInBounds : function(x,y,nx,ny)
	{
		return x>=0 && y>=0 && x<nx && y<ny ;
	},

	random2dIndex : function(nx,ny)
	{
		return {
			x : Math.floor( Math.random()*nx ) ,
			y : Math.floor( Math.random()*ny )
		} ;
		// random() never returns 1, so will be <nx <ny
	},


	// View
	
	makeView : function( caWidth, caHeight, tileSize, f )
	{
		var view = this.new2dArray(caWidth,caHeight) ;
		
		this.forEach2d( caWidth, caHeight, function(x,y)
		{
			var item = f( (x+.5)*tileSize, (y+.5)*tileSize ) ;
			
			view[x][y] = item ;
		}) ;
		
		return view ;
	}
	/*
	, makeRect : function( cx, cy, tileSize )
	{
		var inset = 0 ;
		
		var rect = new paper.Rectangle() ;
		rect.width  = tileSize - inset ;
		rect.height = tileSize - inset ;
		rect.center = new paper.Point(cx,cy) ;
		
		var cell = new paper.Path.Rectangle(rect) ;
		
		cell.fillColor = 'white' ;
		cell.strokeColor = 'C9E6F0' ;
		cell.strokeWidth = 1 ;
		
		return cell ;
	}*/	
} ;