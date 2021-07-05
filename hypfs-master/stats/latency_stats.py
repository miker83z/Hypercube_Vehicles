import csv
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import glob
import os
import scipy.stats
import math



### Set your path to the folder containing the .csv files
PATH = 'C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/insert_DHT/' # Use your path
### Fetch all files in path
fileNames = os.listdir(PATH)


### Filter file name list for files ending with .csv
fileNames = [file for file in fileNames if '.csv' in file]

#fig, ax = plt.subplots()
### Loop over all files

df = (pd.read_csv(PATH + f  , header = 0 ) for f in fileNames)
concat_df  = pd.concat(df, ignore_index=True)


def box_plot_latency(df):
    color = dict(boxes='DarkGreen', whiskers='DarkOrange',medians='DarkBlue', caps='Gray')
    df.plot(kind='box', color=color, sym='r+' )
    plt.title("Latency")
    plt.ylabel("Latency (sec")
    plt.show()

def line_plot_latency(df):
    print(df.mean(axis=0))
    plt.plot(df.mean(axis=0))
    
    plt.title("Latency superset")
    plt.xlabel("Size DHT")
    plt.ylabel("Latency (sec")
    plt.show()

def hops_stats(df):
    # iterating the columns
    columns = []
    for col in df.columns:
        columns.append(col)
  
    mean = df.mean(axis=0, skipna = True)
    print(mean.head())
    print("----------------")

    fig = plt.figure(figsize = (10, 5))
    #print(  mean.iloc[: , 1:]) # first two columns of data frame with all rows)
    plt.bar(columns, mean, color ='blue',width = 0.4)

    plt.xlabel("DHT size")
    plt.ylabel("No. of hops")
    plt.title("Average hops")

    plt.show()



def mean_confidence_interval(data, confidence=0.95):


    a = 1.0 * np.array(data)
    n = len(a)
    m, se = np.mean(a), scipy.stats.sem(a)
    h = se * scipy.stats.t.ppf((1 + confidence) / 2., n-1)
    return round((m-h)/1000, 2), round((m+h)/1000, 2), round(m/1000, 2)


#ESECUZIONE
for col in concat_df.columns:
    print(col)
        #columns.append(col)
    myList = concat_df[col].dropna().to_numpy() 
    print( mean_confidence_interval(myList))

#print(list(concatenated_df.iloc[2:, 0:1]))
#print(col_one_list)

