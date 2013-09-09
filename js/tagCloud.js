			function tagCloud(){
					$.getJSON(
						'./ajax/tags.php',
						{},
						createTagCloud
					);
			};
			function createTagCloud(response)
			{
				var str='',i=0;
				$.each(response.tags,function(index,tag)
						{
						var color=i%2==0?'color:#A52A2A':'color:#6495ED';
						var fontSize=((parseInt(tag.rating,10)/30));
						str+='<a href="'+'#'+tag.city+'" style="font-size:'+fontSize+'em;'+color+'" title="'+tag.city+'" value="'+tag.city+'" id="'+tag.city+'">'+tag.city+'</a>';
						i++;
						});
				$('#cloud').html(str);
			}

