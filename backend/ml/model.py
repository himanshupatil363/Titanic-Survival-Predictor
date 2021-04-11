import numpy as np
import sys
import json 
import joblib
# For loading the trained model
loaded_model = joblib.load("model_joblib")
# Taking data from node backend throught arguements
data=json.loads(sys.argv[1])
ls=[]
# Formatting the data in the form of list
for key in data.keys():
    ls.append(float(data[key]))
# Formatting the list into expected input format of model
a = np.asarray(ls).reshape(1,-1)
# Getting output from model
predicted_value= loaded_model.predict(a)
# Sending it to nodejs
print(int(predicted_value))