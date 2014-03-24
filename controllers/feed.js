var date=new Date(),
n=date.toISOString(),
current = n.substring(0,10);
var d = new Date();
d.setDate(d.getDate() + 1);
var o = d.toISOString();
tomorrow = o.substring(0,10);

exports.clicks = function(req, res)
{
	

	var http = require('http');
  http.get("http://login.revenueads.com/affiliates/api/6/reports.asmx/Clicks?api_key=HniUHPhugrM&affiliate_id=1108&start_date="+current+"&end_date="+tomorrow+"&offer_id=2974&campaign_id=0&include_duplicates=false&start_at_row=1&row_limit=0", function (result) {
    result.on('data', function (chunk) {
        res.write(chunk);
    });
    result.on('end', function () {
        res.end();
    });
  });
}

exports.conversions = function(req, res)
{
	var http = require('http');
  http.get("http://login.revenueads.com/affiliates/api/5/reports.asmx/Conversions?api_key=HniUHPhugrM&affiliate_id=1108&start_date="+current+"&end_date="+tomorrow+"&offer_id=2974&campaign_id=0&start_at_row=1&row_limit=0", function (result) {
    result.on('data', function (chunk) {
        res.write(chunk);
    });
    result.on('end', function () {
        res.end();
    });
  });
}

exports.clicksUpdate = function(req, res)
{
	

	var http = require('http');
  http.get("http://login.revenueads.com/affiliates/api/6/reports.asmx/Clicks?api_key=HniUHPhugrM&affiliate_id=1108&start_date="+req.query.from+"&end_date="+req.query.to+"&offer_id=2974&campaign_id=0&include_duplicates=false&start_at_row=1&row_limit=0", function (result) {
    result.on('data', function (chunk) {
        res.write(chunk);
    });
    result.on('end', function () {
        res.end();
    });
  });
}

exports.conversionsUpdate = function(req, res)
{
	var http = require('http');
  http.get("http://login.revenueads.com/affiliates/api/5/reports.asmx/Conversions?api_key=HniUHPhugrM&affiliate_id=1108&start_date="+req.query.from+"&end_date="+req.query.to+"&offer_id=2974&campaign_id=0&start_at_row=1&row_limit=0", function (result) {
    result.on('data', function (chunk) {
        res.write(chunk);
    });
    result.on('end', function () {
        res.end();
    });
  });
}
