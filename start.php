<!DOCTYPE html>
<html>
<head>
  <link href="css/flick/jquery-ui-1.8.20.custom.css" rel="stylesheet" type="text/css"/>
	<link type="text/css" rel="stylesheet" href="jplist/code-canyon-preview/css/jplist.css" />

  <script src="js/jquery-1.7.2.min.js"></script>
  <script src="js/jquery-ui-1.8.20.custom.min.js"></script>

  <script src="jplist/code-canyon-preview/js/jplist.min.js" type="text/javascript"></script>

<script src="jquery.layout-1.2.0.js"></script>

  <script>
  $(document).ready(function() {

	$("#tabs").tabs();
    $("body").layout({ applyDefaultStyles: true });

  });

    $(function() {


      		$( "#login_button" )
  				.button()
  				.click(function() {
  					$( "#dialog-form" ).dialog( "open" );
  			});


  					$( "#dialog-form" ).dialog({

  						height: 300,
  						width: 350,
  						modal: true,
  						buttons: {
  							"Create an account": function() {
								alert('create account');
  							},
  							Cancel: function() {
  								alert('cancel');
  								$( this ).dialog( "close" );
  							}
  						},
  						close: function() {
  							allFields.val( "" ).removeClass( "ui-state-error" );
  						}
  		});

  		$("#demo").jplist({

							//main options
							items_box: ".list", //items container
							item_path: ".list-item", //path to the item
							ignore_special: false,

							//sort
							sort: {title: "p.title",
								   description: "p.desc",
								   like: "p.like",
								   date: "p.date"},

							//sort options for page load
							sort_name: "title",
							sort_order: "asc", //"desc",
							sort_type: "text",

							//filter
							filter_path: ".filter",
							filter: {title: "p.title",
									 description: "p.desc"}
				});

  });
  </script>

  	<style>
  		body { font-size: 62.5%; }
  		label, input { display:block; }
  		input.text { margin-bottom:12px; width:95%; padding: .4em; }
  		fieldset { padding:0; border:0; margin-top:25px; }
  		h1 { font-size: 1.2em; margin: .6em 0; }
  		div#users-contain { width: 350px; margin: 20px 0; }
  		div#users-contain table { margin: 1em 0; border-collapse: collapse; width: 100%; }
  		div#users-contain table td, div#users-contain table th { border: 1px solid #eee; padding: .6em 10px; text-align: left; }
  		.ui-dialog .ui-state-error { padding: .3em; }
  		.validateTips { border: 1px solid transparent; padding: 0.3em; }
	</style>
</head>
<body style="font-size:62.5%;">


<div class="ui-layout-center">
<div id="tabs">
    <ul>
        <li><a href="#fragment-1"><span>My Loyalties</span></a></li>
        <li><a href="#fragment-2"><span>My Coupons</span></a></li>
        <li><a href="#fragment-3"><span>Suggest</span></a></li>
    </ul>
    <div id="fragment-1">
			<!-- demo -->
				<div id="demo" class="box jplist">

					<!-- panel -->
					<div class="panel box panel-top">

						<div class="drop-down page-by">
							<ul>
								<li><span data-number="3"> 3 per page </span></li>
								<li><span data-number="5"> 5 per page </span></li>
								<li><span data-number="10"> 10 per page </span></li>
								<li><span data-number="all"> view all </span></li>
							</ul>
						</div>
						<div class="drop-down sort-drop-down">
							<ul>
								<li><span data-sort="title" data-order="asc" data-type="text">Title A-Z</span></li>
								<li><span data-sort="title" data-order="desc" data-type="text">Title Z-A</span></li>
								<li><span data-sort="description" data-order="asc" data-type="text">Description A-Z</span></li>
								<li><span data-sort="description" data-order="desc" data-type="text">Description Z-A</span></li>
								<li><span data-sort="like" data-order="asc" data-type="number">Likes asc</span></li>
								<li><span data-sort="like" data-order="desc" data-type="number">Likes desc</span></li>
								<li><span data-sort="date" data-order="asc" data-type="date">Date asc</span></li>
								<li><span data-sort="date" data-order="desc" data-type="date">Date desc</span></li>
							</ul>
						</div>

						<!-- filter -->
						<div class="filter">
							<input data-name="title" type="text" value="" placeholder="Filter by title"/>
							<input data-name="description" type="text" value="" placeholder="Filter by description"/>
						</div>
						<div class="info" data-type="range"></div>
						<div class="buttons"></div>
					</div>

					<!-- data -->
					<div class="list">

						<!-- item 1 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/arch-1.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">03/15/2012</p>
								<p class="title">Arch</p>
								<p class="desc">An arch is a structure that spans a space and supports a load. Arches appeared as early as the 2nd millennium BC in Mesopotamian brick architecture and their systematic use started with the Ancient Romans who were the first to apply the technique to a wide range of structures.</p>
								<p class="like">5 Likes</p>
							</div>
						</div>

						<!-- item 2 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/arch-2.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">03/18/2012</p>
								<p class="title">Architecture</p>
								<p class="desc">Architecture is both the process and product of planning, designing and construction. Architectural works, in the material form of buildings, are often perceived as cultural symbols and as works of art. Historical civilizations are often identified with their surviving architectural achievements.</p>
								<p class="like">25 Likes</p>
							</div>
						</div>

						<!-- item 3 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/autumn-1.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">01/16/2011</p>
								<p class="title">Autumn</p>
								<p class="desc">Autumn or Fall is one of the four temperate seasons. Autumn marks the transition from summer into winter, in September (Northern Hemisphere) or March (Southern Hemisphere) when the arrival of night becomes noticeably earlier. The equinoxes might be expected to be in the middle of their respective seasons, but temperature lag (caused by the thermal latency of the ground and sea) means that seasons appear later than dates calculated from a purely astronomical perspective.</p>
								<p class="like">12 Likes</p>
							</div>
						</div>

						<!-- item 4 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/boats-1.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">02/24/2000</p>
								<p class="title">Boats</p>
								<p class="desc">A boat is a watercraft of any size designed to float or plane, to provide passage across water. Usually this water will be inland (lakes) or in protected coastal areas. However, boats such as the whaleboat were designed to be operated from a ship in an offshore environment. In naval terms, a boat is a vessel small enough to be carried aboard another vessel (a ship).</p>
								<p class="like">11 Likes</p>
							</div>
						</div>

						<!-- item 5 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/book-1.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">11/22/2001</p>
								<p class="title">Books</p>
								<p class="desc">A book is a set of written, printed, illustrated, or blank sheets, made of ink, paper, parchment, or other materials, usually fastened together to hinge at one side. A single sheet within a book is called a leaf, and each side of a leaf is called a page. A book produced in electronic format is known as an electronic book (e-book).</p>
								<p class="like">100 Likes</p>
							</div>
						</div>

						<!-- item 6 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/business-1.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">02/05/2004</p>
								<p class="title">Business</p>
								<p class="desc">A business (also known as enterprise or firm) is an organization engaged in the trade of goods, services, or both to consumers. Businesses are predominant in capitalist economies, where most of them are privately owned and administered to earn profit to increase the wealth of their owners. Businesses may also be not-for-profit or state-owned. A business owned by multiple individuals may be referred to as a company, although that term also has a more precise meaning.</p>
								<p class="like">15 Likes</p>
							</div>
						</div>

						<!-- item 7 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/calendar-1.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">05/08/2003</p>
								<p class="title">Calendar</p>
								<p class="desc">A calendar is a system of organizing days for social, religious, commercial, or administrative purposes. This is done by giving names to periods of time, typically days, weeks, months, and years. The name given to each day is known as a date. Periods in a calendar (such as years and months) are usually, though not necessarily, synchronized with the cycle of the sun or the moon.</p>
								<p class="like">18 Likes</p>
							</div>
						</div>

						<!-- item 8 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/car-1.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">09/01/2007</p>
								<p class="title">Car</p>
								<p class="desc">An automobile, autocar, motor car or car is a wheeled motor vehicle used for transporting passengers, which also carries its own engine or motor. Most definitions of the term specify that automobiles are designed to run primarily on roads, to have seating for one to eight people, to typically have four wheels, and to be constructed principally for the transport of people rather than goods.</p>
								<p class="like">7 Likes</p>
							</div>
						</div>

						<!-- item 9 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/christmas-1.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">11/12/1998</p>
								<p class="title">Christmas</p>
								<p class="desc">Christmas or Christmas Day is an annual commemoration of the birth of Jesus Christ, celebrated generally on December as a religious and cultural holiday by billions of people around the world. A feast central to the Christian liturgical year, it closes the Advent season and initiates the twelve days of Christmastide. Christmas is a civil holiday in many of the world's nations, is celebrated by an increasing number of non-Christians, and is an integral part of the Christmas and holiday season.</p>
								<p class="like">29 Likes</p>
							</div>
						</div>

						<!-- item 10 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/christmas-2.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">06/10/1995</p>
								<p class="title">The Christmas Toy</p>
								<p class="desc">The Christmas Toy is a 1986 made-for-TV movie by The Jim Henson Company. It originally aired on ABC on December 6, 1986, and was originally sponsored by Kraft Foods. Originally introduced by Kermit The Frog, it was released on VHS format in 1993. In 2008, HIT Entertainment (distributed by Lionsgate) released the special on DVD, but edited out Kermit's appearance due to legal issues.</p>
								<p class="like">35 Likes</p>
							</div>
						</div>

						<!-- item 11 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/christmas-3.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">04/04/2006</p>
								<p class="title">Christmas Tree</p>
								<p class="desc">A Christmas tree is a decorated tree, usually an evergreen conifer such as pine or fir, traditionally associated with the celebration of Christmas. An artificial Christmas tree is an object made to resemble such a tree, usually made from polyvinyl chloride.</p>
								<p class="like">86 Likes</p>
							</div>
						</div>

						<!-- item 12 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/city-1.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">06/19/1981</p>
								<p class="title">City</p>
								<p class="desc">A city is a relatively large and permanent settlement. Although there is no agreement on how a city is distinguished from a town within general English language meanings, many cities have a particular administrative, legal, or historical status based on local law.</p>
								<p class="like">125 Likes</p>
							</div>
						</div>

						<!-- item 13 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/city-2.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">08/25/1991</p>
								<p class="title">Capital City</p>
								<p class="desc">A capital city (or just, capital) is the area of a country, province, region, or state considered to enjoy primary status; although there are exceptions, a capital is typically a city that physically encompasses the offices and meeting places of the seat of government and is usually fixed by law or by the constitution. An alternative term is political capital, but this phrase has a second meaning based on an alternate sense of the word capital. The capital is often, but not necessarily, the largest city of its constituent area.</p>
								<p class="like">191 Likes</p>
							</div>
						</div>

						<!-- item 14 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/coffee-grass.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">02/02/2002</p>
								<p class="title">Coffee</p>
								<p class="desc">Coffee is a brewed beverage with a bitter, acidic flavor prepared from the roasted seeds of the coffee plant. The beans are found in coffee cherries, which grow on trees cultivated in over 70 countries, primarily in equatorial Latin America, Southeast Asia, South Asia and Africa. Green (unroasted) coffee is one of the most traded agricultural commodities in the world. Coffee can have a stimulating effect on humans due to its caffeine content. It is one of the most-consumed beverages in the world.</p>
								<p class="like">18 Likes</p>
							</div>
						</div>

						<!-- item 15 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/coins.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">03/17/1999</p>
								<p class="title">Coins</p>
								<p class="desc">A coin is a piece of hard material that is standardized in weight, is produced in large quantities in order to facilitate trade, and primarily can be used as a legal tender. Coins are usually metal or a metallic material and sometimes made of synthetic materials, usually in the shape of a disc, and most often issued by a government. Coins are used as a form of money in transactions of various kinds, from the everyday circulation coins to the storage of large numbers of bullion coins. In the present day, coins and banknotes make up currency, the cash forms of all modern money systems.</p>
								<p class="like">39 Likes</p>
							</div>
						</div>

						<!-- item 16 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/crayons.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">03/08/1990</p>
								<p class="title">Crayons</p>
								<p class="desc">A crayon is a stick of colored wax, charcoal, chalk, or other materials used for writing, coloring, drawing, and other methods of illustration. A crayon made of oiled chalk is called an oil pastel; when made of pigment with a dry binder, it is simply a pastel; both are popular media for color artwork. A grease pencil or china marker (UK chinagraph pencil) is made of colored hardened grease and is useful for marking on hard, glossy surfaces such as porcelain or glass. Some fine arts companies such as Swiss Caran d'Ache manufacture water-soluble crayons, whose colors are easily mixed once applied to media.</p>
								<p class="like">14 Likes</p>
							</div>
						</div>

						<!-- item 17 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/cupcakes.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">05/25/1965</p>
								<p class="title">Cupcakes</p>
								<p class="desc">A cupcake (also British English: fairy cake; Australian English: patty cake or cup cake) is a small cake designed to serve one person, frequently baked in a small, thin paper or aluminum cup. As with larger cakes, frosting and other cake decorations, such as sprinkles, are common on cupcakes. Although their origin is unknown, recipes for cupcakes have been printed since at least the late 12th century.</p>
								<p class="like">128 Likes</p>
							</div>
						</div>

						<!-- item 18 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/eggs-nest.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">31/12/1986</p>
								<p class="title">Nests</p>
								<p class="desc">A nest is a place of refuge to hold an animal's eggs or provide a place to live or raise offspring. They are usually made of some organic material such as twigs, grass, and leaves; or may simply be a depression in the ground, or a hole in a tree, rock or building. Human-made materials, such as string, plastic, cloth, hair or paper, may be used.</p>
								<p class="like">66 Likes</p>
							</div>
						</div>

						<!-- item 19 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/flower-1.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">03/19/2012</p>
								<p class="title">Flower</p>
								<p class="desc">A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants (plants of the division Magnoliophyta, also called angiosperms). The biological function of a flower is to effect reproduction, usually by providing a mechanism for the union of sperm with eggs. Flowers may facilitate outcrossing (fusion of sperm and eggs from different individuals in a population) or allow selfing (fusion of sperm and egg from the same flower).</p>
								<p class="like">85 Likes</p>
							</div>
						</div>

						<!-- item 20 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/flower-2.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">01/11/2011</p>
								<p class="title">Pseudanthium</p>
								<p class="desc">A pseudanthium (Greek for "false flower") or flower head is a special type of inflorescence, in which several flowers are grouped together to form a flower-like structure. The real flowers are generally small and greatly reduced, but can sometimes be quite large (as in the sunflower flower head). Pseudanthia take various forms. The individual flowers of a pseudanthium can be called florets.</p>
								<p class="like">22 Likes</p>
							</div>
						</div>

						<!-- item 21 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/flower-3.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">06/06/1993</p>
								<p class="title">Flowering Plant</p>
								<p class="desc">The flowering plants (angiosperms), also known as Angiospermae or Magnoliophyta, are the most diverse group of land plants. Angiosperms are seed-producing plants like the gymnosperms and can be distinguished from the gymnosperms by a series of synapomorphies (derived characteristics). These characteristics include flowers, endosperm within the seeds, and the production of fruits that contain the seeds.</p>
								<p class="like">90 Likes</p>
							</div>
						</div>

						<!-- item 22 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/fountain.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">06/10/1995</p>
								<p class="title">Fountains</p>
								<p class="desc">A fountain (from the Latin "fons" or "fontis", a source or spring) is a piece of architecture which pours water into a basin or jets it into the air either to supply drinking water or for decorative or dramatic effect. Fountains were originally purely functional, connected to springs or aqueducts and used to provide drinking water and water for bathing and washing to the residents of cities, towns and villages. Until the late 19th century most fountains operated by gravity, and needed a source of water higher than the fountain, such as a reservoir or aqueduct, to make the water flow or jet into the air.</p>
								<p class="like">40 Likes</p>
							</div>
						</div>

						<!-- item 23 -->
						<div class="list-item">
							<!-- img -->
							<div class="img">
								<img src="jplist/code-canyon-preview/img/leaves.jpg" alt="" title=""/>
							</div>

							<!-- data -->
							<div class="block">
								<p class="date">04/12/1990</p>
								<p class="title">Leaves</p>
								<p class="desc">A leaf is an organ of a vascular plant, as defined in botanical terms, and in particular in plant morphology. Foliage is a mass noun that refers to leaves as a feature of plants. Typically a leaf is a thin, flattened organ borne above ground and specialized or photosynthesis, but many types of leaves are adapted in ways almost unrecognisable in those terms: some are not flat (for example many succulent leaves and conifers), some are not above ground (such as bulb scales), and some are without major photosynthetic function (consider for example cataphylls, spines, and cotyledons).</p>
								<p class="like">42 Likes</p>
							</div>
						</div>


					</div>

					<div class="box jplist-no-results">
						<p>No results found</p>
					</div>

					<!-- panel -->
					<div class="panel box panel-bottom">

						<div class="drop-down page-by">
							<ul>
								<li><span data-number="3"> 3 per page </span></li>
								<li><span data-number="5"> 5 per page </span></li>
								<li><span data-number="10"> 10 per page </span></li>
								<li><span data-number="all"> view all </span></li>
							</ul>
						</div>
						<div class="drop-down sort-drop-down">
							<ul>
								<li><span data-sort="title" data-order="asc" data-type="text">Title A-Z</span></li>
								<li><span data-sort="title" data-order="desc" data-type="text">Title Z-A</span></li>
								<li><span data-sort="description" data-order="asc" data-type="text">Description A-Z</span></li>
								<li><span data-sort="description" data-order="desc" data-type="text">Description Z-A</span></li>
								<li><span data-sort="like" data-order="asc" data-type="number">Likes asc</span></li>
								<li><span data-sort="like" data-order="desc" data-type="number">Likes desc</span></li>
								<li><span data-sort="date" data-order="asc" data-type="date">Date asc</span></li>
								<li><span data-sort="date" data-order="desc" data-type="date">Date desc</span></li>
							</ul>
						</div>

						<div class="info" data-type="range"></div>
						<div class="buttons"></div>
					</div>
				</div>
				<!-- end of demo -->
    </div>
    <div id="fragment-2">

        My Coupons <BR>
        dfsdfsdf<BR>
        fs<BR>
        dfsd
        fsdf<BR>
        sdf
        sdf<BR>
        sfs
        df<BR>
        sf<BR>
        sf<BR>
        sf<BR>
        sfs<BR>
        fs<BR>
        fs
        fs
        fs

    </div>
    <div id="fragment-3">
        Suggest
    </div>
</div>

</div>
<div class="ui-layout-north" align="right">

    <form id="searchform" method="post">
	<div>
	<button id="login_button" class="ui-button ui-state-default ui-corner-all">Login / Register</button>
	</div>
    </form>



</div>
<div class="ui-layout-south">South</div>
<div class="ui-layout-west">West</div>

<div id="dialog-form" title="Create new user">
	<p class="validateTips">All form fields are required.</p>

	<form>
	<fieldset>
		<label for="name">Name</label>
		<input type="text" name="name" id="name" class="text ui-widget-content ui-corner-all" />
		<label for="email">Email</label>
		<input type="text" name="email" id="email" value="" class="text ui-widget-content ui-corner-all" />
		<label for="password">Password</label>
		<input type="password" name="password" id="password" value="" class="text ui-widget-content ui-corner-all" />
	</fieldset>
	</form>
</div>

</body>
</html>