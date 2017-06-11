# -*- coding: cp936 -*-
import numpy as np
import pandas as pd
import urllib2
import re
from bs4 import BeautifulSoup
import datetime

class Data_Crawler():
    def __init__(self):
        self.base = "http://www.wdzj.com/dangan/dianping/"
        self.output='dianping.txt'#####
    def getpage(self,url):
        timeout=30
        headers = {
        'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36'}
        request = urllib2.Request(url, headers=headers)
        response = urllib2.urlopen(request, timeout=timeout)
        return response.read()
    
    def parse_single_page(self,url):
        page = self.getpage(url)
        page =page.decode('utf-8')
        soup = BeautifulSoup(page)
        content = soup.find_all('ul',class_="commentList")
        data=[]
        for i in range(len(content)):
            
            tmp=content[i].findAll("div",class_="nameTit")
            if len(tmp)==1:
                name = tmp[0].findAll("span",class_="name")[0].text
                date = tmp[0].findAll("span",class_="date")[0].text
                bold = tmp[0].findAll("span",class_="bold")[0].text
            else:
                name =u'NULL'
                date=u'NULL'
                bold=u'NULL'
                
            tmp=content[i].findAll("dl",class_="comment")
            comment="";
            if len(tmp)==1:
                for j in tmp[0].findAll("dd"):
                    comment+=j.findAll("span",class_="num")[0].text
                    comment+=","
            else:
                comment =u'NULL'
            tmp=content[i].findAll("dl",class_="impression")
            impression=""
            if len(tmp)==1:
                for tt in  tmp[0].findAll("span",class_="tags"):
                   impression += tt.text
                   impression += ","
            else:
                impression =u'NULL'
            tmp=content[i].findAll("div",class_="comBg")
            if len(tmp)==1:
                commentFont = tmp[0].findAll("div",class_="commentFont")[0].findAll("p",class_="font")[0].text
                commentFont =commentFont.replace("\n","")
                commentFont =commentFont.replace("\t","")
            else:
                commentFont =u'NULL'
            data.append ( (name+u'\t'+date+u'\t'+bold+u'\t'+impression+u'\t'+commentFont+u'\t'+comment+u'\n').encode('utf-8') ) #########
        return data
    def run(self,start,end):
        f= open(self.output,mode='a')
        f.write('Name\tDate\tBold\tImpression\tCommentFont\tComment\n')
        for page in range(start,end):
            if page%10==0:
                print 'processing:',(page-start)*1.0/(end-start),'\tlines have been written: ',page
            url = self.base+"p%s.html"%page
            try:
               data= self.parse_single_page(url)
            except:
               print "Break at Page ",page
            for dd in data:
                f.write(dd)
        f.close()

    def write_to_excel(self,name):
        f = open(self.output,mode="r")
        c =f.readlines()
        c_list=[]
        t1 =c[0].strip().split('\t')
        for line in c[1:]:
            c_list.append(line.decode('utf-8').strip().split('\t'))
        c = pd.DataFrame(c_list)
        c.columns=t1
        c.to_excel(name,encoding='gbk')
        return 0

if __name__ == '__main__': 
    print datetime.datetime.now()
    t=Data_Crawler()
    t.run(1,1117)
    print datetime.datetime.now()
    #t.write_to_excel('dianping.xls')##############
