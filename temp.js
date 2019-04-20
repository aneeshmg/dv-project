const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey('e5098ceb-46b2-42c6-ac88-0e392bbcc74f');



async function start()
{
    var resp = await deepai.callStandardApi("text-tagging", {
        text: "Husband was craving Chicken Teriyaki & gyoza, so we found Musashi. I was very unimpressed. We started with gyoza and edamame. Neither were anything special. We then ordered a chicken teriyaki plate and a few sushi rolls. The chicken teriyaki was nothing more than some boiled chicken smothered in teriyaki sauce. Was not good at all. The sushi was mediocre at best. While they were friendly and the service was pretty good - I will not be back."
});
console.log(resp);
}

start();