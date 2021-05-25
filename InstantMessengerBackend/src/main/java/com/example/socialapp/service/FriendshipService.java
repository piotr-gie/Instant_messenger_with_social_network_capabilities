package com.example.socialapp.service;

import com.example.socialapp.dto.FriendshipDto;
import com.example.socialapp.model.Friendship;
import com.example.socialapp.model.FriendshipRepository;
import com.example.socialapp.model.User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FriendshipService {

    FriendshipRepository friendshipRepository;
    UserService userService;

    public FriendshipService(FriendshipRepository friendshipRepository, UserService userService) {
        this.friendshipRepository = friendshipRepository;
        this.userService = userService;
    }


    @Transactional
    public void deleteFriendship(int user1Id, int user2Id){
    friendshipRepository.deleteByUser1AndUser2(userService.getById(user1Id),
                userService.getById(user2Id));
    friendshipRepository.deleteByUser1AndUser2(userService.getById(user2Id),
                    userService.getById(user1Id));
    }

    public Friendship addFriendship(int user1Id, int user2Id) throws IllegalArgumentException{
        User user1 = userService.getById(user1Id);
        User user2 = userService.getById(user2Id);

        if(friendshipRepository.getByUser1AndUser2(user1, user2).isPresent()
                || friendshipRepository.getByUser1AndUser2(user2, user1).isPresent()){
            throw new IllegalArgumentException("Friendship of these users already exists");
        }
        Friendship friendship = new Friendship(user1, user2);
        friendshipRepository.save(friendship);
        return friendship;
    }

    public Friendship acceptFriendship(int user1Id, int user2Id){
        User user1 = userService.getById(user1Id);
        User user2 = userService.getById(user2Id);

        Optional<Friendship> f = friendshipRepository.getByUser1AndUser2(user1, user2);
                if(f.isEmpty()){
                    f = friendshipRepository.getByUser1AndUser2(user2,user1);
                }
        Friendship friendship = f.get();
        friendship.setAccepted(true);
        friendshipRepository.save(friendship);

        return friendship;

    }

    public List<FriendshipDto> getAllFriends(int userId){
        User user = userService.getById(userId);
        List<FriendshipDto> list = friendshipRepository.getAllByUser1(user)
                .stream()
                .map(x-> new FriendshipDto(x.getUser2(), x.isAccepted()))
                .collect(Collectors.toList());
        List<FriendshipDto> list2 = friendshipRepository.getAllByUser2(user)
                .stream()
                .map(x-> new FriendshipDto(x.getUser1(), x.isAccepted()))
                .collect(Collectors.toList());
        list.addAll(list2);

        return list;
    }

}
