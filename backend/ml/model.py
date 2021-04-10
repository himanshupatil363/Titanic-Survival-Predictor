import numpy as np
import sys
import json 
import joblib
loaded_model = joblib.load("model_joblib")
data=json.loads(sys.argv[1])
ls=[]
for key in data.keys():
    ls.append(float(data[key]))
a = np.asarray(ls).reshape(1,-1)
predicted_value= loaded_model.predict(a)
print(int(predicted_value))