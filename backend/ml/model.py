import pandas as pd 
import numpy as np
import sys
import json 
import matplotlib.pyplot as plt
import category_encoders as ce
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
import joblib
path=r'C:\Users\Himanshu\Desktop\Webtest\backend\ml\titanic.csv'
df = pd.read_csv(path)
df.isna().sum()
df['Age']= df['Age'].fillna(df['Age'].mean())
df.dropna(subset=['Embarked'],inplace=True)
df.isna().sum()
cols = df.columns.tolist()
num_cols = df.select_dtypes([np.int64,np.float64]).columns.tolist()
num_cols.remove('PassengerId')
for col in num_cols:
    df.hist(column=col)
from pandas.plotting import scatter_matrix
scatter_matrix(df[num_cols],figsize=(50,50))
obj_cols = df.select_dtypes([np.object]).columns.tolist()
for col in obj_cols:
    df[col].value_counts().plot(kind='bar')
y = pd.Series(df['Survived'])
drop_list = ['Survived','Name','Ticket','Cabin']
X = df.drop(drop_list,axis=1)
encoder=ce.OneHotEncoder(handle_unknown='return_nan',return_df=True,use_cat_names=True)
X = encoder.fit_transform(X)
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,stratify=y,random_state=42)
model = RandomForestClassifier()
model.fit(X_train,y_train)
train_preds = model.predict(X_train)
test_preds = model.predict(X_test)
joblib.dump(model,"model_joblib")
loaded_model = joblib.load("model_joblib")
data=json.loads(sys.argv[1])
ls=[]
for key in data.keys():
    ls.append(float(data[key]))
#each value represents a feature present in the training set Hint: the users should be able to enter their own values/(or) select from a drop down list of values to make custom predictions
a = np.asarray(ls).reshape(1,-1)
predicted_value= loaded_model.predict(a)
print(int(predicted_value))