while read -r line; 
do
    export $line
done < config.env