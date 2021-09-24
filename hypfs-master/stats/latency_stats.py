import csv
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import glob
import os
import scipy.stats
import math
import seaborn as sns
import itertools



### Set your path to the folder containing the .csv files
PATH_SUPERSET_DHT = 'C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/superset_DHT/' # Use your path
PATH_PIN_DHT = 'C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/pin_DHT/' # Use your path
PATH_INSERT_DHT= 'C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/insert_DHT/' # Use your path
PATH_IOTA_PUBLISH = 'C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/insert_IOTA/' # Use your path
PATH_IOTA_RETRIEVE = 'C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/retrieve_IOTA/' # Use your path
PATH_MAM = 'C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/insert_fetch_MAM/' # Use your path
PATH_HOPS_SUPERSET = 'C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/hops/superset/'
PATH_HOPS_PIN = 'C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/hops/pin/'

def load_file(PATH):
    ### Fetch all files in path
    fileNames = os.listdir(PATH)
    ### Filter file name list for files ending with .csv
    fileNames = [file for file in fileNames if '.csv' in file]
  
    df = (pd.read_csv(PATH + f  , header = 0 ) for f in fileNames)
    concat_df  = pd.concat(df, ignore_index=True)
    return concat_df


def box_plot_latency(df, title):

    mean = df.mean(axis=0, skipna = True)
    print(mean.head())


    color = dict(boxes='DarkGreen', whiskers='DarkOrange',medians='DarkBlue', caps='Gray')
    bp = df.plot(kind='box', color=color, sym='r+' )
        
    print(bp)

    plt.title( title)
    plt.xlabel("Hypercube size")
    plt.ylabel("Latency (ms)")
    #plt.ylim(top=16000)
   
    plt.show()

def box_sb(df):
    # Draw a vertical boxplot grouped 
    # by a categorical variable:
    sns.set_style("whitegrid")
  
    ax = sns.boxplot( data=df)
    plt.show()




def line_plot_latency(df, title):

    print(df.mean(axis=0))
    plt.plot(df.mean(axis=0), color='green', linestyle='dashed', linewidth = 1,
    marker='o', markerfacecolor='blue', markersize=7)
    plt.title(title)
    plt.xlabel("Size DHT")
    plt.ylabel("Latency (ms)")
    plt.ylim([900,2200])
    plt.show()

def hops_stats(df, title):
    # iterating the columns
    columns = []
    for col in df.columns:
        columns.append(col)
  
    mean = df.mean(axis=0, skipna = True)
    print(mean.head())
    print("----------------")

    fig = plt.figure(figsize = (6, 5))
    #print(  mean.iloc[: , 1:]) # first two columns of data frame with all rows)
    plt.bar(columns, mean, color =(0.2, 0.4, 0.6, 0.6))
    plt.xlabel("DHT size")
    plt.ylabel("No. of hops")
    #plt.ylim(top=5.50)
    plt.title(title)

    plt.show()



def mean_confidence_interval(data, confidence=0.95):

    a = 1.0 * np.array(data)
    n = len(a)
    m, se = np.mean(a), scipy.stats.sem(a)
    h = se * scipy.stats.t.ppf((1 + confidence) / 2., n-1)
    print("Avg latency:",round(m/1000, 2), "- Conf. Int. (95 %):", round((m-h)/1000, 2),  round((m+h)/1000, 2)  )

def confidence_stats(df):
    for col in df.columns:
        #print(col)
            #columns.append(col)
        myList = df[col].dropna().to_numpy() 
        mean_confidence_interval(myList)


    
    
def compare_latency(df_list, df_labels, title):
    samples = []
    x = list(range(1, 101))
    y = list(range(1, 18000))
    plt.figure(figsize=(7,6))
    for df,label in zip(df_list,df_labels):
        average_df = df.mean(axis = 0)
        print(average_df)
        sample = df.dropna().sample(n=100,  random_state=1)
        plt.axhline(y = average_df[0], color = 'grey', linestyle = 'dashed')    
        plt.plot(x, sample , label = label)
        plt.xlabel('Trx')
        plt.ylabel('Time(ms)')
        #plt.ylim([0,20000])
        plt.title(title)
        plt.legend()
      
    plt.show()
    
def dht_stats():
    #INSERT
    '''
    df_insert_dht = load_file(PATH_INSERT_DHT)
    box_plot_latency(df_insert_dht)
    line_plot_latency(df_insert_dht, "Insert DHT")
    #confidence_stats(df_insert_dht)
    '''
    #SUPERSET
    
    df_superset_dht = load_file(PATH_SUPERSET_DHT)
    box_plot_latency(df_superset_dht, "Latency Superset Search")
    line_plot_latency(df_superset_dht, "Latency Superset Search")
    #confidence_stats(df_superset_dht)
    

    #PIN
    
    df_pin_dht = load_file(PATH_PIN_DHT)
    box_plot_latency(df_pin_dht, 'Latency Pin Search')
    line_plot_latency(df_pin_dht, "Latency Pin Search")
    #confidence_stats(df_pin_dht)
    

def compare_iota_mam():
    #INSERT PRIVATE LOCAL POW
    

    df_publish_iota_private_remote_pow = pd.read_csv(PATH_IOTA_PUBLISH + 'publish_private_pow_false_node_iota.csv')
    df_publish_iota_private_local_pow = pd.read_csv(PATH_IOTA_PUBLISH + 'publish_private_pow_true_node_iota.csv')
   
    df_publish_iota_public_remote_pow = pd.read_csv(PATH_IOTA_PUBLISH + 'publish_public_pow_false_node_iota.csv')
    df_publish_iota_public_local_pow = pd.read_csv(PATH_IOTA_PUBLISH + 'publish_public_pow_true_node_iota.csv')

    df_publish_mainnet_iota_public_local_pow = pd.read_csv(PATH_IOTA_PUBLISH + 'publish_mainnet_public_pow_true_node_iota.csv')
    df_publish_mainnet_iota_public_remote_pow = pd.read_csv(PATH_IOTA_PUBLISH + 'publish_mainnet_public_pow_false_node_iota.csv')
   
    df_publish_mam = pd.read_csv(PATH_MAM + 'publish.csv')
   
    '''
    #PRIVATE LOCAL VS REMOTE
    df_list = [df_publish_iota_private_remote_pow, df_publish_iota_private_local_pow ]
    df_labels = ["Private node mainnet remote POW","Private node mainnet local POW"]
    compare_latency(df_list, df_labels,  "Insert IOTA latency")
    
    #PUBLISH LOCAL VS REMOTE
    df_list = [ df_publish_iota_public_remote_pow, df_publish_iota_public_local_pow ]
    df_labels = ["Public node mainnet remote POW", "Public node mainnet local POW"]
    compare_latency(df_list, df_labels,  "Insert IOTA latency")
    '''
    '''
    #REMOTE PRIVATE VS PUBLIC VS MAM
    df_list = [df_publish_iota_private_remote_pow ,df_publish_iota_public_remote_pow, df_publish_mam]
    df_labels = ["Private node mainnet remote POW", "Public node mainnet remote POW", "MAM testnet"]
    compare_latency(df_list, df_labels,  "Insert IOTA latency")

    #LOCAL PRIVATE VS PUBLIC VS MAM
    df_list = [df_publish_iota_private_local_pow ,df_publish_iota_public_local_pow, df_publish_mam]
    df_labels = ["Private node mainnet local POW", "Public node mainnet local POW", "MAM testnet"]
    compare_latency(df_list, df_labels,  "Insert IOTA latency")
    
    df_list = [df_publish_mainnet_iota_public_local_pow ,df_publish_iota_public_local_pow, df_publish_iota_private_local_pow,  df_publish_mam ]
    df_labels = ["Public node mainnet local POW", "Public node testnet local POW", "Private node mainnet local POW", "MAM testnet" ]
    compare_latency(df_list, df_labels,  "Insert IOTA latency")
    
    df_list = [df_publish_mainnet_iota_public_remote_pow ,df_publish_iota_public_remote_pow, df_publish_iota_private_remote_pow,df_publish_mam ]
    df_labels = ["Public node mainnet remote POW", "Public node testnet remote POW", "Private node mainnet remote POW", "MAM testnet" ]
    compare_latency(df_list, df_labels,  "Insert IOTA latency")
    '''
    '''

    #MAINET VS TESTNET
    df_list = [df_publish_mainnet_iota_public_local_pow ,df_publish_iota_public_local_pow]
    df_labels = ["Public node mainnet local POW", "Public node testnet local POW"]
    compare_latency(df_list, df_labels,  "Insert IOTA latency")
    
    df_list = [df_publish_mainnet_iota_public_remote_pow ,df_publish_iota_public_remote_pow]
    df_labels = ["Public node mainnet remote POW", "Public node testnet remote POW"]
    compare_latency(df_list, df_labels,  "Insert IOTA latency")
    '''


    #CONF INTERVAL INSERT IOTA
    '''
    df_latency = [df_publish_iota_private_remote_pow, df_publish_iota_private_local_pow, df_publish_iota_public_remote_pow, df_publish_iota_public_local_pow, df_publish_mam]
    df_labels = ["Private node mainnet remote POW", "Private node mainnet local POW", "Public node mainnet remote POW", "Public node mainnet local POW", "MAM testnet"]

    print("-------------------INSERT IOTA---------------------"+ "\n" )
    for el, label in  zip(df_latency, df_labels):
        print(label),
        confidence_stats(el)
        print("\n")
        
    '''

    '''
    #CONF INTERVAL INSERT IOTA MAINNTE TESTNET
    
    df_latency = [df_publish_mainnet_iota_public_local_pow, df_publish_iota_public_local_pow,  df_publish_mainnet_iota_public_remote_pow, df_publish_iota_public_remote_pow  ]
    df_labels = ["Public node mainnet local POW", "Public node testnet local POW","Public node mainnet remote POW", "Public node testnet remote POW"]

    print("-------------------INSERT IOTA---------------------"+ "\n" )
    for el, label in  zip(df_latency, df_labels):
        print(label),
        confidence_stats(el)
        print("\n")
        
    '''

    #FETCH
    '''
    df_retrieve_iota_private_remote_pow = pd.read_csv(PATH_IOTA_RETRIEVE + 'retrieve_private_pow_false_node_iota.csv')
    df_retrieve_iota_private_local_pow = pd.read_csv(PATH_IOTA_RETRIEVE + 'retrieve_private_pow_true_node_iota.csv')

    df_retrieve_iota_public_remote_pow = pd.read_csv(PATH_IOTA_RETRIEVE + 'retrieve_public_pow_false_node_iota.csv')
    df_retrieve_iota_public_local_pow = pd.read_csv(PATH_IOTA_RETRIEVE + 'retrieve_public_pow_true_node_iota.csv')
    
    df_retrieve_mainnet_public = pd.read_csv(PATH_IOTA_RETRIEVE + 'retrieve_mainnet_public_pow_false_node_iota.csv')
    
    df_retrieve_mam = pd.read_csv(PATH_MAM + 'retrieve.csv')

    
    df_list = [df_retrieve_iota_private_local_pow ,df_retrieve_iota_public_local_pow, df_retrieve_mam]
    df_labels = ["Private node testnet", "Public node testnet", "MAM testnet"]
    compare_latency(df_list, df_labels, "Fetch IOTA latency") 
    
    
    
    df_list = [df_retrieve_iota_private_local_pow ,df_retrieve_mainnet_public, df_retrieve_mam]
    df_labels = ["Private node mainnet", "Public node mainnet", "MAM testnet"]
    compare_latency(df_list, df_labels, "Fetch IOTA latency") 
    
    #MAINET VS TESTNET
    df_list = [df_retrieve_mainnet_public ,df_retrieve_iota_public_local_pow ]
    df_labels = ["Public node mainnet", "Public node testnet"]
    compare_latency(df_list, df_labels,  "Fetch IOTA latency")



    #CONF INTERVAL FETCH IOTA
    
    df_latency = [df_retrieve_iota_private_local_pow, df_retrieve_iota_public_local_pow, df_retrieve_mam]
    df_labels = ["Private node",  "Public node", "MAM"]

    print("-------------------FETCH IOTA---------------------"+ "\n" )
    for el, label in  zip(df_latency, df_labels):
        print(label),
        confidence_stats(el)
        print("\n")
        
    #CONF INTERVAL FETCH IOTA MAINNET VS TESTNET
    
    df_latency = [df_retrieve_mainnet_public, df_retrieve_iota_public_remote_pow ]
    df_labels = ["Mainnet",  "Testnet"]

    print("-------------------FETCH IOTA---------------------"+ "\n" )
    for el, label in  zip(df_latency, df_labels):
        print(label),
        confidence_stats(el)
        print("\n")
        
#'''
  

df_super = load_file(PATH_HOPS_SUPERSET)
hops_stats(df_super,  "Average Superset hops")

df_pin = load_file(PATH_HOPS_PIN)
hops_stats(df_pin,  "Average Pin hops")

#compare_iota_mam()
#dht_stats()

#Latency insert DHT
df = load_file(PATH_INSERT_DHT)
box_plot_latency(df, 'Latency Insert DHT')

