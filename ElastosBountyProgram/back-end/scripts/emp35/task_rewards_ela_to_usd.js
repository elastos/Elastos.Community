var conversionRate = 6.82;

db.tasks.find({ "reward.isUsd": false }).forEach(function (task) {
		db.tasks.update(
			{ "_id": task._id }, { $set: 
		  	{
	  			"reward.usd": (task.reward.ela * conversionRate),
	  			"reward.isUsd": true,
		  	}
		})
		print('[' + task._id + '] converting ELA reward [' + task.reward.ela + '] to USD value [' + task.reward.ela * conversionRate + ']')
})

db.tasks.find({ "rewardUpfront.isUsd": false }).forEach(function (task) {
		db.tasks.update(
			{ "_id": task._id }, { $set: 
		  	{
	  			"rewardUpfront.usd": (task.reward.ela * conversionRate),
	  			"rewardUpfront.isUsd": true,
		  	}
		})	  
	    print('[' + task._id + '] converting ELA upfront reward [' + task.rewardUpfront.ela + '] to USD value [' + task.rewardUpfront.ela * conversionRate + ']')
})

